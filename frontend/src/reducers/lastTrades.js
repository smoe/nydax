import C from '../constants/actions';

export default function lastTrades(state = [], action) {
  switch (action.type) {
    case C.SET_LAST_TRADES:
      return action.payload;
    default:
      return state;
  }
}
