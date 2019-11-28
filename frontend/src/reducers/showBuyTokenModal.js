import C from '../constants/actions';

export default function showBuyTokenModal(state = false, action) {
  if (action.type === C.TOGGLE_BUY_TOKEN_MODAL) return !state;
  return state;
}
