import C from '../constants/actions';

export default function showVerifyIdentityModal(state = false, action) {
  if (action.type === C.TOGGLE_SHOW_VERIFY_IDENTITY_MODAL) return !state;
  return state;
}
