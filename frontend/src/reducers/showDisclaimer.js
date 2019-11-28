import C from '../constants/actions';

export default function showDisclaimer(state = false, action) {
  if (action.type === C.DISLAIMER_SEEN) return false;
  return state;
}
