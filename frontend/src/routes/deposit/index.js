import React from 'react';
import titles from '../../constants/titles';
import Deposit from './Deposit';
import Layout from '../../components/Layout';
import routes from '../../constants/routes';
import C from '../../constants/actions';

async function action(context) {
  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.DEPOSIT,
  });

  return {
    title: titles.DEPOSIT,
    component: (
      <Layout title={titles.DEPOSIT} route={routes.DEPOSIT}>
        <Deposit />
      </Layout>
    ),
  };
}

export default action;
