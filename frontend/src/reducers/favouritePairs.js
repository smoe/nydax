import C from '../constants/actions';

export default function favoritePairs(state = [], action) {
  switch (action.type) {
    case C.TOGGLE_USER_FAVOURITE_PAIR_ID:
      return state.includes(action.payload)
        ? state.filter(item => item !== action.payload)
        : [...state, action.payload];
    case C.SET_USER_FAVOURITE_PAIR_IDS:
      return action.payload;
    case C.ADD_USER_FAVOURITE_PAIR_ID:
      return state.includes(action.payload)
        ? state
        : [...state, action.payload];
    case C.REMOVE_USER_FAVOURITE_PAIR_ID:
      return state.filter(item => item !== action.payload);
    default:
      return state;
  }
}
