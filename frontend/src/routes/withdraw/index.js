import React from 'react';
import titles from '../../constants/titles';
import Withdraw from './Withdraw';
import Layout from '../../components/Layout';
import C from '../../constants/actions';
import routes from '../../constants/routes';

async function action(context) {
  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.WITHDRAW,
  });

  return {
    title: titles.WITHDRAW,
    component: (
      <Layout title={titles.WITHDRAW}>
        <Withdraw />
      </Layout>
    ),
  };
}

export default action;
