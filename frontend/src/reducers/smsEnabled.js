import C from '../constants/actions';

export default function smsEnabled(state = false, action) {
  switch (action.type) {
    case C.SET_SMS_AUTH:
      return action.payload;
    case C.SWITCH_SMS_AUTH:
      return !state;
    default:
      return state;
  }
}
