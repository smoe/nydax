import React from 'react';
import titles from '../../../constants/titles';
import Register from './Register';
import Body from '../../../components/Body';
import C from '../../../constants/actions';
import routes from '../../../constants/routes';

async function action(context) {
  // if (context.store.getState().userInfo.authToken) {
  //   return { redirect: routes.TRADING_PLATFORM };
  // }

  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.REGISTER,
  });

  return {
    title: titles.REGISTER,
    component: (
      <Body>
        <Register referralToken={context.query.ref} />
      </Body>
    ),
  };
}

export default action;
