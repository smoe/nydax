import C from '../constants/actions';

export default function isUploadingProfilePicture(state = false, action) {
  switch (action.type) {
    case C.SET_IS_UPLOADING_PROFILE_PIC:
      return action.payload;
    default:
      return state;
  }
}
