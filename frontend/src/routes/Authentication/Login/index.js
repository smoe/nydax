import React from 'react';
import titles from '../../../constants/titles';
import Login from './Login';
import Body from '../../../components/Body';
import C from '../../../constants/actions';
import routes from '../../../constants/routes';

async function action(context) {
  // if (context.store.getState().userInfo.authToken) {
  //   return { redirect: routes.DASHBOARD };
  // }

  context.store.dispatch({
    type: C.SET_CURRENT_ROUTE,
    payload: routes.LOGIN,
  });

  return {
    title: titles.LOGIN,
    component: (
      <Body>
        <Login
          passwordReset={Number(context.query.passwordReset) === 1}
          emailConfirmed={
            context.query.emailConfirmed
              ? Number(context.query.emailConfirmed)
              : undefined
          }
          returnTo={context.query.return_to}
        />
      </Body>
    ),
  };
}

export default action;
