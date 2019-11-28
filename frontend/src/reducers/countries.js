import C from '../constants/actions';

export default function countries(state = [], action) {
  if (action.type === C.SET_COUNTRIES) return action.payload;
  return state;
}
