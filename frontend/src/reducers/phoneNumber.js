import C from '../constants/actions';

export default function phoneNumber(state = '', action) {
  if (action.type === C.SET_PHONE_NUMBER) return action.payload;
  return state;
}
