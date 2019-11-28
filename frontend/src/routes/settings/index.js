import React from 'react';
import titles from '../../constants/titles';
import Settings from './Settings';
import Layout from '../../components/Layout';
import C from '../../constants/actions';
import routes from '../../constants/routes';

async function action(context) {
  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.SETTINGS,
  });

  return {
    title: titles.SETTINGS,
    component: (
      <div>
        <Layout title={titles.SETTINGS}>
          <Settings />
        </Layout>
      </div>
    ),
  };
}

export default action;
