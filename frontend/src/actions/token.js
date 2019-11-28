/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import C from '../constants/actions';
import config from '../config';

export const fetch = () => dispatch => {
  axios
    .get(`${config.api.serverUrl}/v1/token`, {
      headers: {
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.SET_TOKENS,
        payload: res.data,
      });
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
