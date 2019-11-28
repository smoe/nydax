import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import rootReducer from '../src/reducers';
import history from '../src/history';
import App from '../src/components/App';
import initialState from '../src/store/initialState.json5';

const req = require.context('../src', true, /\.story\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const middleware = [thunk.withExtraArgument({ history })];
const enhancer = applyMiddleware(...middleware);

const context = {
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
  store: createStore(rootReducer, initialState, enhancer),
};

addDecorator(story => (
  <App context={context}>
    <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
      {story()}
    </div>
  </App>
));
addDecorator(withKnobs);

configure(loadStories, module);
