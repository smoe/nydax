import React from 'react';
import titles from '../../constants/titles';
import StartupInfo from './StartupInfo';
import Layout from '../../components/Layout';
import C from '../../constants/actions';
import routes from '../../constants/routes';

async function action(context) {
  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.STARTUP_INFO,
  });

  return {
    title: titles.STARTUP_INFO,
    component: (
      <Layout title={titles.STARTUP_INFO}>
        <StartupInfo tokenId={context.params.tokenId} />
      </Layout>
    ),
  };
}

export default action;
