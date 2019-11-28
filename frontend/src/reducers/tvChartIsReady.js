import C from '../constants/actions';

export default function tvChartIsReady(state = false, action) {
  if (action.type === C.SET_TV_CHART_READY) return action.payload;
  return state;
}
