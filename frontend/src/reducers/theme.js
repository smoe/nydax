import C from '../constants/actions';

export default function user(state = 'dark', action) {
  if (action.type === C.SET_THEME) {
    return action.payload;
  }
  return state;
}
