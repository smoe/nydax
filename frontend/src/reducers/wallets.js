import C from '../constants/actions';

export default function wallets(state = [], action) {
  switch (action.type) {
    case C.SET_USER_WALLETS:
      return action.payload || [];
    case C.INCREASE_WALLET_BALANCE:
      return [
        ...state.filter(item => item.tokenId !== action.payload.tokenId),
        {
          ...state.find(item => item.tokenId === action.payload.tokenId),
          balance:
            state.find(item => item.tokenId === action.payload.tokenId)
              .balance + action.payload.amount,
        },
      ];
    case C.DECREASE_WALLET_BALANCE:
      return [
        ...state.filter(item => item.tokenId !== action.payload.tokenId),
        {
          ...state.find(item => item.tokenId === action.payload.tokenId),
          balance:
            state.find(item => item.tokenId === action.payload.tokenId)
              .balance - action.payload.amount,
        },
      ];
    default:
      return state;
  }
}
