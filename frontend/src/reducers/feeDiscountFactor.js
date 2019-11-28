import C from '../constants/actions';

export default function feeDiscountFactor(state = [], action) {
  switch (action.type) {
    case C.SET_USER_FEE_DISCOUNT_FACTOR:
      return action.payload;
    default:
      return state;
  }
}
