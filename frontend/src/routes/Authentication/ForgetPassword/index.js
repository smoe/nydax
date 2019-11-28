import React from 'react';
import titles from '../../../constants/titles';
import ForgetPassword from './ForgetPassword';
import Body from '../../../components/Body';
import C from '../../../constants/actions';
import routes from '../../../constants/routes';

async function action(context) {
  // if (context.store.getState().userInfo.authToken) {
  //   return { redirect: routes.TRADING_PLATFORM };
  // }

  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.FORGET_PASSWORD,
  });

  return {
    title: titles.FORGET_PASSWORD,
    component: (
      <Body>
        <ForgetPassword />
      </Body>
    ),
  };
}

export default action;
