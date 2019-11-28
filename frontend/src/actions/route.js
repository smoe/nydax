/* eslint-disable import/prefer-default-export */
import C from '../constants/actions';

export function setRoute(newRoute) {
  return {
    type: C.SET_CURRENT_ROUTE,
    payload: newRoute,
  };
}
