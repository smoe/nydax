import C from '../constants/actions';

export default function selectedTokenId(state = 1, action) {
  switch (action.type) {
    case C.SET_SELECTED_TOKEN_ID:
      return action.payload;
    default:
      return state;
  }
}
