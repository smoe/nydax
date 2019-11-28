import C from '../constants/actions';

export default function twoFactorAuthSecret(state = '', action) {
  switch (action.type) {
    case C.SET_2FA_AUTH_SECRET:
      return action.payload;
    default:
      return state;
  }
}
