import C from '../constants/actions';

export default function currencies(state = [], action) {
  if (action.type === C.SET_CURRENCIES) return action.payload;
  return state;
}
