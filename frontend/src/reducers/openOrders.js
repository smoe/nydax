import C from '../constants/actions';

export default function openOrders(state = [], action) {
  switch (action.type) {
    case C.SET_USER_OPEN_ORDERS:
      return action.payload || [];
    case C.ADD_USER_ORDER:
      return [action.payload, ...state];
    case C.REMOVE_USER_ORDER:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}
