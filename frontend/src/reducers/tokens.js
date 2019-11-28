import C from '../constants/actions';

export default function tokens(state = [], action) {
  switch (action.type) {
    case C.SET_TOKENS:
      return action.payload;
    default:
      return state;
  }
}
