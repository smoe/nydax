import C from '../constants/actions';

export default function sessions(state = [], action) {
  switch (action.type) {
    case C.SET_USER_SESSIONS:
      return action.payload;
    case C.REMOVE_A_USER_SESSION:
      return state.filter(item => item.id !== action.payload);
    case C.REMOVE_OTHER_USER_SESSIONS:
      return state.filter(item => item.id === action.payload);
    default:
      return state;
  }
}
