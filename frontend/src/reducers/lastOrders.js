import C from '../constants/actions';

export default function lastOrders(state = [], action) {
  switch (action.type) {
    case C.SET_LAST_ORDERS:
      return [
        ...state.filter(order => order.pairId !== action.payload.pairId),
        ...action.payload.orders,
      ];
    default:
      return state;
  }
}
