import C from '../constants/actions';

export default function profile(state = {}, action) {
  switch (action.type) {
    case C.SET_USER_PROFILE:
      return action.payload;
    case C.UPDATE_USER_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
