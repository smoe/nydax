import C from '../constants/actions';

export default function depthChartData(state = [], action) {
  switch (action.type) {
    case C.SET_DEPTH_CHART_DATA:
      return action.payload;
    default:
      return state;
  }
}
