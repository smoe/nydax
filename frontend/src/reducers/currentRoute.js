import C from '../constants/actions';

export default function currentRoute(state = '', action) {
  switch (action.type) {
    case C.SET_CURRENT_ROUTE:
      return action.payload;
    default:
      return state;
  }
}
