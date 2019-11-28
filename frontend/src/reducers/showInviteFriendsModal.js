import C from '../constants/actions';

export default function showInviteFriendsModal(state = false, action) {
  if (action.type === C.TOGGLE_SHOW_INVITE_FRIENDS_MODAL) return !state;
  return state;
}
