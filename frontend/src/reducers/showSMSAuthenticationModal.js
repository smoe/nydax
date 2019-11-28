import C from '../constants/actions';

export default function showSMSAuthenticationModal(state = false, action) {
  if (action.type === C.TOGGLE_SHOW_SMS_AUTHENTICATION_MODAL) return !state;
  return state;
}
