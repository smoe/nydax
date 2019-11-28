/* eslint-disable import/prefer-default-export */
// import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import C from '../constants/actions';
import config from '../config';

export const fetchCountries = () => dispatch => {
  axios({
    method: 'get',
    url: `${config.api.serverUrl}/v1/country`,
    headers: {
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: C.SET_COUNTRIES,
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
