import C from '../constants/actions';

export default function withdrawalLimit24(state = 2, action) {
  switch (action.type) {
    case C.SET_USER_WITHDRAWAL_LIMIT_24:
      return action.payload;
    default:
      return state;
  }
}
