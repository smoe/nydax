import C from '../constants/actions';

export default function showGetMoreInvoModal(state = false, action) {
  if (action.type === C.TOGGLE_SHOW_GET_MORE_INVO_MODAL) return !state;
  return state;
}
