import C from '../constants/actions';

export const increaseBalance = (tokenId, amount) => dispatch => {
  dispatch({
    type: C.INCREASE_WALLET_BALANCE,
    payload: { tokenId, amount },
  });
};

export const decreaseBalance = (tokenId, amount) => dispatch => {
  dispatch({
    type: C.DECREASE_WALLET_BALANCE,
    payload: { tokenId, amount },
  });
};
