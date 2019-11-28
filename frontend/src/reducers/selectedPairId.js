import C from '../constants/actions';

export default function selectedPairId(state = 1, action) {
  switch (action.type) {
    case C.SET_SELECTED_PAIR_ID:
      return action.payload;
    default:
      return state;
  }
}
