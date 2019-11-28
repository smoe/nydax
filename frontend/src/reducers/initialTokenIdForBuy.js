import C from '../constants/actions';

export default function initialTokenIdForBuy(state = null, action) {
  if (action.type === C.SET_INITIAL_TOKEN_FOR_BUY) return action.payload;
  return state;
}
