import C from '../constants/actions';

export default function timezones(state = [], action) {
  if (action.type === C.SET_TIME_ZONES) return action.payload;
  return state;
}
