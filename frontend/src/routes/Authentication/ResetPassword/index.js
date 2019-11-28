import React from 'react';
import titles from '../../../constants/titles';
import ResetPassword from './ResetPassword';
import Body from '../../../components/Body';
import C from '../../../constants/actions';
import routes from '../../../constants/routes';

async function action(context) {
  // if (context.store.getState().userInfo.authToken) {
  //   return { redirect: routes.TRADING_PLATFORM };
  // }

  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.RESET_PASSWORD,
  });

  return {
    title: titles.RESET_PASSWORD,
    component: (
      <Body>
        <ResetPassword token={context.params.resetPasswordToken} />
      </Body>
    ),
  };
}

export default action;
