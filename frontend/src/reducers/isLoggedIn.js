import C from '../constants/actions';

export default function isLoggedIn(state = false, action) {
  if (action.type === C.SET_IS_LOGGED_IN) return action.payload;
  return state;
}
