import C from '../constants/actions';

export default function tradeHistory(state = [], action) {
  switch (action.type) {
    case C.SET_USER_TRADE_HISTORY:
      return action.payload || [];
    default:
      return state;
  }
}
