import C from '../constants/actions';
import predifinedLayout from '../components/Header/predefinedLayouts';

export default function tradingPlatformLayout(
  state = predifinedLayout[0],
  action,
) {
  switch (action.type) {
    case C.CHANGE_TRADING_PLATFORM_LAYOUT:
      return action.tradingPlatformLayout;
    default:
      return state;
  }
}
