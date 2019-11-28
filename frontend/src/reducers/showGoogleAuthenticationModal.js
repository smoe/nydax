import C from '../constants/actions';

export default function showGoogleAuthenticationModal(state = false, action) {
  if (action.type === C.TOGGLE_SHOW_GOOGLE_AUTHENTICATION_MODAL) return !state;
  return state;
}
