import C from '../constants/actions';

export default function twoFAEnabled(state = false, action) {
  switch (action.type) {
    case C.SET_2FA_AUTH:
      return action.payload;
    case C.SWITCH_2FA_AUTH:
      return !state;
    default:
      return state;
  }
}
