import C from '../constants/actions';

export default function tradingPlatformGridIsLocked(state = false, action) {
  if (action.type === C.TOGGLE_TRADING_PLATFORM_IS_LOCKED) return !state;
  return state;
}
