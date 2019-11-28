import React from 'react';
import titles from '../../constants/titles';
import PrivacyPolicy from './PrivacyPolicy';
import C from '../../constants/actions';
import routes from '../../constants/routes';

async function action(context) {
  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.PRIVACY_POLICY,
  });

  return {
    title: titles.PRIVACY_POLICY,
    component: <PrivacyPolicy />,
  };
}

export default action;
