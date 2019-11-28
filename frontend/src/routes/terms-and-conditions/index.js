import React from 'react';
import titles from '../../constants/titles';
import TermsAndConditions from './TermsAndConditions';
import C from '../../constants/actions';
import routes from '../../constants/routes';

async function action(context) {
  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.TERMS_AND_CONDITIONS,
  });

  return {
    title: titles.TERMS_AND_CONDITIONS,
    component: <TermsAndConditions />,
  };
}

export default action;
