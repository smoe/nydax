import C from '../constants/actions';

export default function authToken(state = '', action) {
  switch (action.type) {
    case C.SET_AUTH_TOKEN:
      return action.payload;
    default:
      return state;
  }
}
