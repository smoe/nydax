import C from '../constants/actions';

export default function profilePicUploadProgress(state = [], action) {
  switch (action.type) {
    case C.SET_PROFILE_PIC_UPLOAD_PROGRESS:
      return action.payload;
    default:
      return state;
  }
}
