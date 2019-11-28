import C from '../constants/actions';

export default function accountActivity(state = [], action) {
  switch (action.type) {
    case C.SET_USER_ACCOUNT_ACTIVITY:
      return action.payload;
    default:
      return state;
  }
}
