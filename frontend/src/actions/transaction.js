/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { decreaseBalance } from './wallet';
import config from '../config';
import C from '../constants/actions';

export const withdrawSubmit = transaction => (dispatch, getState) => {
  // TODO: connect it to server
  // const tokenId = getState().tokens.find(
  //   token => token.name === transaction.tokenName,
  // ).id;
  const walletId = getState().userInfo.wallets.find(
    wallet => wallet.tokenId === transaction.tokenId,
  ).id;

  axios({
    data: {
      transaction: JSON.stringify({ ...transaction, walletId }),
    },
    method: 'post',
    url: `${config.api.serverUrl}/v1/transaction`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200) {
        dispatch(decreaseBalance(transaction.tokenId, transaction.amount));
        toastr.success(res.data.message.title, res.data.message.description);
      }
      dispatch({ type: C.TOGGLE_WITHDRAWING });
    })
    .catch(err => {
      if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
      dispatch({ type: C.TOGGLE_WITHDRAWING });
    });
};

export const fetchTransactions = () => (dispatch, getState) => {
  axios({
    method: 'get',
    url: `${config.api.serverUrl}/v1/transaction`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: C.SET_USER_TRANSACTION_HISTORY,
          payload: res.data,
        });
      }
    })
    .catch(err => {
      if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};
