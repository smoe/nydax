import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import https, { Server as httpsServer } from 'https';
import { Server as httpServer } from 'http';
import fs from 'fs';
import expressStaticGzip from 'express-static-gzip';
import axios from 'axios';
import to from 'await-to-js';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import config from './config';
// import initialState from './store/initialState.json5';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

let server;
let http;
if (config.environment === 'development') {
  server = httpServer(app);
} else {
  const privateKey = fs.readFileSync(config.sslPrivateKeyPath);
  const certificate = fs.readFileSync(config.sslCertificatePath);
  server = httpsServer(
    {
      key: privateKey,
      cert: certificate,
    },
    app,
  );

  // set up a route to redirect http to https
  const httpApp = express();
  http = httpServer(httpApp);
  httpApp.get('*', (req, res) => {
    res.redirect(`https://${req.headers.host}${req.url}`);
  });
}

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
// app.use(express.static(path.resolve(__dirname, 'public')));
app.use(
  '/',
  expressStaticGzip(path.resolve(__dirname, 'public'), { index: false }),
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.get('/auth/verifyEmail/:token', async (req, res) => {
  const { token } = req.params;
  axios
    .get(
      `${config.environment === 'development' ? 'http' : 'https'}://localhost:${
        config.api.serverPort
      }/v1/auth/verifyEmail/${token}`,
      {
        headers: {
          [config.apiKeyHeader]: config.apiKey,
        },
        httpsAgent: agent,
      },
    )
    .then(() => {
      res.redirect('/login?emailConfirmed=1');
    })
    .catch(() => {
      res.redirect('/login?emailConfirmed=0');
    });
});

app.get('/', (req, res, next) => {
  const { ref } = req.query;
  if (ref) {
    res.redirect(`${config.host}/register?ref=${ref}`);
  } else next();
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
    });

    // const initialState = {
    //   user: req.user || null,
    // };

    let state;
    const [err, fetchedState] = await to(
      axios({
        method: 'get',
        url: `${
          config.environment === 'development' ? 'http' : 'https'
        }://localhost:${config.api.serverPort}/v1/generalState`,
        httpsAgent: agent,
        headers: {
          [config.apiKeyHeader]: config.apiKey,
        },
      }),
    );
    if (err) {
      state = {};
    } else {
      state = fetchedState.data;
    }

    const store = await configureStore(
      {
        currentRoute: req.path,
        ...state,
      },
      {
        fetch,
        // I should not use `history` on server.. but how I do redirection? follow universal-router
      },
      true,
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);

    data.scripts = Array.from(scripts);
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------

if (!module.hot) {
  server.listen(
    config.environment === 'development' ? config.portHTTP : config.portHTTPS,
    () => {
      console.info(`The server is running at ${config.host}`);
      console.info(`The backend server is running at ${config.api.serverUrl}`);
    },
  );
  // redirect http to https
  if (config.environment === 'production') {
    http.listen(config.portHTTP);
  }
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
