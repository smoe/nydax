/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import C from '../constants/actions';
// import history from '../history';
import { successes, titles } from '../constants/messages';
import { relu } from '../utils';
import config from '../config';

export const deleteProfilePic = () => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/user/deleteProfilePic`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.UPDATE_USER_PROFILE,
        payload: { profilePicUrl: res.data },
      });
      toastr.success(
        titles.USER_PROFILE_UPDATED,
        successes.PROFILE_IMAGE_UPDATED_SUCCESSFULLY,
      );
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

export const uploadProfilePic = file => (dispatch, getState) => {
  const formdata = new FormData();
  formdata.append('profilePic', file);

  return axios
    .post(`${config.api.serverUrl}/v1/user/uploadProfilePic`, formdata, {
      onUploadProgress: progressEvent => {
        dispatch({
          type: C.SET_PROFILE_PIC_UPLOAD_PROGRESS,
          payload: Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          ),
        });
      },
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: C.UPDATE_USER_PROFILE,
          payload: { profilePicUrl: res.data },
        });
        dispatch({ type: C.TOGGLE_SHOW_UPLOAD_PROFILE_PIC_MODAL });
        toastr.success(
          titles.USER_PROFILE_UPDATED,
          successes.PROFILE_IMAGE_UPDATED_SUCCESSFULLY,
        );
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

export const revokeAuthToken = showMessage => dispatch => {
  dispatch({
    type: C.SET_AUTH_TOKEN,
    payload: '',
  });
  // dispatch({
  //   type: C.SET_CURRENT_ROUTE,
  //   payload: routes.DASHBOARD,
  // });
  dispatch({
    type: C.SET_SMS_AUTH,
    payload: false,
  });
  dispatch({
    type: C.SET_2FA_AUTH,
    payload: false,
  });
  dispatch({
    type: C.SET_IS_LOGGED_IN,
    payload: false,
  });
  dispatch({
    type: C.SET_USER_PROFILE,
    payload: {},
  });
  if (showMessage) toastr.success(titles.LOGOUT, successes.USER_LOGOUT);
  localStorage.removeItem('authToken');
};

export const initializeAuthToken = () => dispatch => {
  dispatch({
    type: C.SET_AUTH_TOKEN,
    payload: localStorage.getItem('authToken'),
  });
};

export const fetchWallet = () => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/wallet`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.SET_USER_WALLETS,
        payload: res.data.map(wallet => ({
          ...wallet,
          balance: relu(Number(wallet.balance)),
          reservedBalance: relu(Number(wallet.reservedBalance)),
        })),
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

export const fetchProfile = () => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/user/profile`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.UPDATE_USER_PROFILE,
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

export const fetchAuthStatus = () => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/user/authStatus`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.SET_SMS_AUTH,
        payload: res.data.smsEnabled,
      });
      dispatch({
        type: C.SET_2FA_AUTH,
        payload: res.data.twoFactorAuthEnabled,
      });
      dispatch({
        type: C.SET_PHONE_NUMBER,
        payload: res.data.phoneNumber,
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

export const sendInvitations = emails => (dispatch, getState) =>
  axios({
    data: { emails: JSON.stringify(emails) },
    method: 'post',
    url: `${config.api.serverUrl}/v1/user/invite`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  }).then(res => {
    if (res.status === 200) {
      dispatch({ type: C.TOGGLE_SHOW_INVITE_FRIENDS_MODAL });
      toastr.success(res.data.message.title, res.data.message.description);
    }
  });
