/* eslint-disable import/prefer-default-export */
// import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import C from '../constants/actions';
import config from '../config';

export const fetchCurrencies = () => dispatch => {
  axios({
    method: 'get',
    url: `${config.api.serverUrl}/v1/currency`,
    headers: {
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: C.SET_CURRENCIES,
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

export const updateCurrency = currencyId => (dispatch, getState) => {
  const lastCurrencyId = getState().userInfo.profile.baseCurrencyId;
  // update currency client side
  dispatch({
    type: C.UPDATE_USER_PROFILE,
    payload: { baseCurrencyId: currencyId },
  });
  axios({
    method: 'post',
    url: `${config.api.serverUrl}/v1/user/currency/${currencyId}`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status !== 200) {
        dispatch({
          type: C.UPDATE_USER_PROFILE,
          payload: { baseCurrencyId: lastCurrencyId },
        });
      }
    })
    .catch(err => {
      // role back in case of server error
      dispatch({
        type: C.UPDATE_USER_PROFILE,
        payload: { baseCurrencyId: lastCurrencyId },
      });
      if (err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};
