import C from '../constants/actions';

export default function showUploadProfilePicModal(state = false, action) {
  if (action.type === C.TOGGLE_SHOW_UPLOAD_PROFILE_PIC_MODAL) return !state;
  return state;
}
