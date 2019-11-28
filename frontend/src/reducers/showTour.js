import C from '../constants/actions';

export default function showTour(state = false, action) {
  switch (action.type) {
    case C.SKIP_TOUR:
      return false;
    default:
      return state;
  }
}
