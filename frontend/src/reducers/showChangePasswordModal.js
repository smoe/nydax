import C from '../constants/actions';

export default function showChangePasswordModal(state = false, action) {
  if (action.type === C.TOGGLE_SHOW_CHANGE_PASSWORD_MODAL) return !state;
  return state;
}
