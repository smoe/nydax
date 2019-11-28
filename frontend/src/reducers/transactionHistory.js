import C from '../constants/actions';

export default function transactionHistory(state = [], action) {
  switch (action.type) {
    case C.SET_USER_TRANSACTION_HISTORY:
      return action.payload || [];
    default:
      return state;
  }
}
