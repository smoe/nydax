import React from 'react';
import titles from '../../constants/titles';
import Dashboard from './Dashboard';
import Layout from '../../components/Layout';
import C from '../../constants/actions';
import routes from '../../constants/routes';

function action(context) {
  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.DASHBOARD,
  });

  return {
    title: titles.DASHBOARD,
    component: (
      <Layout title={titles.DASHBOARD} route={routes.DASHBOARD}>
        <Dashboard />
      </Layout>
    ),
  };
}

export default action;
