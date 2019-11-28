import C from '../constants/actions';

export default function congratulationsModalSeen(state = false, action) {
  if (action.type === C.TOGGLE_CONGRATULATIONS_MODAL_SEEN) return !state;
  return state;
}
