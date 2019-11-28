/* eslint-disable import/prefer-default-export */
// import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import C from '../constants/actions';
import config from '../config';

export const fetchTimezones = () => dispatch => {
  axios({
    method: 'get',
    url: `${config.api.serverUrl}/v1/timezone`,
    headers: {
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: C.SET_TIME_ZONES,
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

export const updateTimezone = timezoneId => (dispatch, getState) => {
  const lastTimezoneId = getState().userInfo.profile.timezoneId;
  // update currency client side
  dispatch({
    type: C.UPDATE_USER_PROFILE,
    payload: { timezoneId },
  });
  axios({
    method: 'post',
    url: `${config.api.serverUrl}/v1/user/timezone/${timezoneId}`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status !== 200) {
        dispatch({
          type: C.UPDATE_USER_PROFILE,
          payload: { timezoneId: lastTimezoneId },
        });
      }
    })
    .catch(err => {
      // role back in case of server error
      dispatch({
        type: C.UPDATE_USER_PROFILE,
        payload: { timezoneId: lastTimezoneId },
      });
      if (err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};
