import React from 'react';
import titles from '../../constants/titles';
import TradingPlatform from './TradingPlatform';
import Layout from '../../components/Layout';
import routes from '../../constants/routes';
import C from '../../constants/actions';

async function action(context) {
  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.TRADING_PLATFORM,
  });

  return {
    title: titles.TRADING_PLATFORM,
    // chunks: ['TradingPlatform'],
    component: (
      <Layout title={titles.TRADING_PLATFORM} route={routes.TRADING_PLATFORM}>
        <TradingPlatform />
      </Layout>
    ),
  };
}

export default action;
