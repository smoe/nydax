/* eslint-disable global-require */
import R from '../constants/routes';
import config from '../config';

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: R.DASHBOARD,
      load: () => import('./dashboard'),
    },
    {
      path: R.TRADING_PLATFORM,
      load: () => import('./trading-platform'),
    },
    {
      path: R.LOGIN,
      load: () => import('./Authentication/Login'),
    },
    {
      path: R.REGISTER,
      load: () => import('./Authentication/Register'),
    },
    {
      path: R.FORGET_PASSWORD,
      load: () => import('./Authentication/ForgetPassword'),
    },
    {
      path: R.RESET_PASSWORD,
      load: () => import('./Authentication/ResetPassword'),
    },
    {
      path: R.VERIFY_EMAIL,
      load: () => import('./Authentication/VerifyEmail'),
    },
    {
      path: R.SETTINGS,
      load: () => import('./settings'),
    },
    {
      path: R.DEPOSIT,
      load: () => import('./deposit'),
    },
    {
      path: R.WITHDRAW,
      load: () => import('./withdraw'),
    },
    {
      path: R.STARTUP_INFO,
      load: () => import('./startup-info'),
    },
    {
      path: R.PRIVACY_POLICY,
      load: () => import('./privacy-policy'),
    },
    {
      path: R.TERMS_AND_CONDITIONS,
      load: () => import('./terms-and-conditions'),
    },

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${config.platformName}-${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
