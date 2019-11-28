import C from '../constants/actions';

export default function profile(state = '', action) {
  switch (action.type) {
    case C.SET_2FA_QRCODE_IMAGE:
      return action.payload;
    default:
      return state;
  }
}
