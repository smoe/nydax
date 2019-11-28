import C from '../constants/actions';

export default function withdrawing(state = false, action) {
  if (action.type === C.TOGGLE_WITHDRAWING) return !state;
  return state;
}
