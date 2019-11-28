import React from 'react';
import titles from '../../../constants/titles';
import VerifyEmail from './VerifyEmail';
import Body from '../../../components/Body';
import C from '../../../constants/actions';
import routes from '../../../constants/routes';

async function action(context) {
  // if (context.store.getState().userInfo.authToken) {
  //   return { redirect: routes.TRADING_PLATFORM };
  // }

  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.VERIFY_EMAIL,
  });

  return {
    title: titles.VERIFY_EMAIL,
    component: (
      <Body>
        <VerifyEmail email={context.query.email} />
      </Body>
    ),
  };
}

export default action;
