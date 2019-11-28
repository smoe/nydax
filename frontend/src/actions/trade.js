/* eslint-disable import/prefer-default-export */
// import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import C from '../constants/actions';
import config from '../config';

export const fetchTradeHistory = () => (dispatch, getState) => {
  // TODO: connect it to server using orderInfo as input argument

  axios({
    method: 'get',
    url: `${config.api.serverUrl}/v1/trade`,
    headers: {
      Authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: C.SET_USER_TRADE_HISTORY,
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

export const updateLastTrades = (pairName, trades) => (dispatch, getState) => {
  const selectedPair = getState().pairs.find(pair => pair.name === pairName);
  if (selectedPair)
    dispatch({
      type: C.SET_LAST_TRADES,
      payload: trades,
    });
};
