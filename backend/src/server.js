import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server as httpsServer } from 'https';
import { Server as httpServer } from 'http';
import fs from 'fs';
import socketIO from 'socket.io';
import schedule from 'node-schedule';
import swaggerUi from 'swagger-ui-express';
import Sequelize from './sequelize';
import swaggerDocument from './swagger.json';
import rabbitmq from './rabbitmq';
import models, { initializeDatabase } from './models';
import Pair from './models/Pair';
import PriceMinute from './models/Price/PriceMinute';
import PriceTick from './models/Price/PriceTick';
import routes from './routes';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import checkAndSendAll from './cron-jobs/kycCron';
import createWalletAddress from './cron-jobs/walletAddressCreationCron';

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
const websocketApp = express();
let server;
let websocketServer;
if (config.environment === 'development') {
  server = httpServer(app);
  websocketServer = httpServer(websocketApp);
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
  websocketServer = httpsServer(
    {
      key: privateKey,
      cert: certificate,
    },
    websocketApp,
  );
}

//
// Configure socket.io
// -----------------------------------------------------------------------------
const io = socketIO(websocketServer);
global.io = io;

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Enable cors
// -----------------------------------------------------------------------------
app.use(cors());

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1', routes);

//
// connect to rabbitMq server
// -----------------------------------------------------------------------------
rabbitmq.connect();

//
// Launch the server
// -----------------------------------------------------------------------------

// Emit Trades data
const tradesEmit = (pairName, pairId) =>
  schedule.scheduleJob('*/5 * * * * *', async () => {
    const d = new Date();
    const currentMinute = Math.round(d.getTime() / 60000);
    PriceTick.sync().then(async () => {
      const trades = await PriceTick.findAll({
        limit: 50,
        where: { pairId },
        order: [['createdAt', 'DESC']],
      });
      global.io.emit(
        `${pairName}_trade`,
        trades.map(item => {
          const tradeTime =
            currentMinute -
            Math.round(new Date(item.createdAt).getTime() / 60000) +
            1;
          let tradeTimeString = '';
          if (tradeTime < 60) {
            tradeTimeString = `${tradeTime} minute${
              tradeTime < 2 ? '' : 's'
            } ago`;
          } else if (tradeTime < 60 * 24) {
            tradeTimeString = `${Math.floor(tradeTime / 60)} hour${
              tradeTime < 2 * 60 ? '' : 's'
            } ago`;
          } else if (tradeTime < 60 * 24 * 30) {
            tradeTimeString = `${Math.floor(tradeTime / (60 * 24))} month${
              tradeTime < 2 * 60 * 24 ? '' : 's'
            } ago`;
          }
          return {
            id: item.id,
            amount: item.volume,
            price: item.price,
            pairId: item.pairId,
            time: tradeTimeString,
          };
        }),
      );
    });
  });

schedule.scheduleJob('*/30 * * * * *', async () => {
  await checkAndSendAll();
});

setTimeout(async () => {
  await createWalletAddress();
}, 0);

schedule.scheduleJob('*/30 * * * *', async () => {
  await createWalletAddress();
});

// Emit tradingView minute data
const pairPriceEmit = pairName =>
  schedule.scheduleJob('*/1 * * * *', async () => {
    PriceMinute.sync().then(async () => {
      const price = await PriceMinute.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']],
        include: [{ model: Pair, where: { name: pairName }, attributes: [] }],
      });
      global.io.emit(`${pairName}_1`, price[0]);
    });
  });

const promise = Sequelize.query('SET FOREIGN_KEY_CHECKS=0;').then(() => {
  models
    .sync(config.alterDB ? { alter: true } : {})
    .then(async () => {
      await initializeDatabase();
      Sequelize.query('SET FOREIGN_KEY_CHECKS=1;');

      Pair.findAll().then(pairs => {
        const pairNames = pairs.map(item => item.name);
        const pairIds = pairs.map(item => item.id);
        if (!config.alterDB) {
          for (let i = 0; i < pairNames.length; i += 1) {
            pairPriceEmit(pairNames[i]);
            tradesEmit(pairNames[i], pairIds[i]);
          }
        }
      });
    })
    .catch(err => console.error(err.stack)); // { alter: true } for updating table columns
});

// if (module.hot) {
promise.then(() => {
  server.listen(
    config.port,
    console.info(
      `The server is running at ${
        config.environment === 'development' ? 'http' : 'https'
      }://localhost:${config.port}/`,
    ),
  );
  websocketServer.listen(
    config.websocketPort,
    console.info(
      `The websocket server is running at ${
        config.environment === 'development' ? 'http' : 'https'
      }://localhost:${config.websocketPort}/`,
    ),
  );
});

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
}

export default app;
