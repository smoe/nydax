import C from '../constants/actions';

export default function orderHistory(state = [], action) {
  switch (action.type) {
    case C.SET_USER_ORDER_HISTORY:
      return action.payload || [];
    default:
      return state;
  }
}
