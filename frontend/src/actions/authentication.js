/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import C from '../constants/actions';
import { errors, titles, successes } from '../constants/messages';
import config from '../config';
// import history from '../history';
import routes from '../constants/routes';

export const resetPasswordEmailSend = email => (dispatch, getState) => {
  axios
    .post(
      `${config.api.serverUrl}/v1/auth/resetPasswordEmail`,
      {
        email,
      },
      {
        headers: {
          Authorization: getState().userInfo.authToken,
          [config.apiKeyHeader]: config.apiKey,
        },
      },
    )
    .then(res => {
      dispatch({ type: C.TOGGLE_SHOW_CHANGE_PASSWORD_MODAL });
      toastr.success(res.data.message.title, res.data.message.description);
      window.location.href = routes.LOGIN;
    })
    .catch(err => {
      if (err.message === 'Network Error') {
        toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
      } else if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const resetPassword = (token, password) => (dispatch, getState) => {
  axios
    .post(
      `${config.api.serverUrl}/v1/auth/resetPassword`,
      {
        password,
        token,
      },
      {
        headers: {
          Authorization: getState().userInfo.authToken,
          [config.apiKeyHeader]: config.apiKey,
        },
      },
    )
    .then(() => {
      window.location.href = `${config.host}${routes.LOGIN}?passwordReset=1`;
      // history.push(`${routes.LOGIN}?resetPassword=1`);
    })
    .catch(err => {
      if (err.message === 'Network Error') {
        toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
      } else if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const sendSMS = phoneNumber => (dispatch, getState) => {
  axios({
    data: { phoneNumber },
    method: 'post',
    url: `${config.api.serverUrl}/v1/auth/smsToken`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(() => {
      dispatch({ type: C.SET_PHONE_NUMBER, payload: phoneNumber });
    })
    .catch(err => {
      if (err.message === 'Network Error') {
        toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
      } else if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const verifySmsToken = token => (dispatch, getState) => {
  axios({
    data: { token },
    method: 'post',
    url: `${config.api.serverUrl}/v1/auth/smsTokenVerify`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(response => {
      // window.location.href = `${config.host}${routes.LOGIN}?passwordReset=1`;
      // history.push(`${routes.LOGIN}?resetPassword=1`);
      toastr.success(
        response.data.message.title,
        response.data.message.description,
      );
      dispatch({ type: C.TOGGLE_SHOW_SMS_AUTHENTICATION_MODAL });
      dispatch({ type: C.SWITCH_SMS_AUTH });
    })
    .catch(err => {
      if (err.message === 'Network Error') {
        toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
      } else if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const getGoogleAutheticator = () => (dispatch, getState) => {
  if (!getState().userInfo.authStatus.twoFAEnabled) {
    axios({
      method: 'get',
      url: `${config.api.serverUrl}/v1/auth/getGoogleAuthenticator`,
      headers: {
        authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
      .then(response => {
        dispatch({ type: C.TOGGLE_SHOW_GOOGLE_AUTHENTICATION_MODAL });
        dispatch({
          type: C.SET_2FA_AUTH_SECRET,
          payload: response.data.secret.base32,
        });
        dispatch({
          type: C.SET_2FA_QRCODE_IMAGE,
          payload: response.data.qrUrl,
        });
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
        } else if (err.response && err.response.data.error) {
          toastr.error(
            err.response.data.error.title,
            err.response.data.error.description,
          );
        }
      });
  } else {
    dispatch({ type: C.TOGGLE_SHOW_GOOGLE_AUTHENTICATION_MODAL });
  }
};

export const validate2FAToken = token => (dispatch, getState) => {
  axios({
    data: {
      token,
    },
    method: 'post',
    url: `${config.api.serverUrl}/v1/auth/validateAuthenticatorSecret`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(response => {
      dispatch({ type: C.TOGGLE_SHOW_GOOGLE_AUTHENTICATION_MODAL });
      dispatch({
        type: C.SET_2FA_AUTH,
        payload: true,
      });
      toastr.success(
        response.data.message.title,
        response.data.message.description,
      );
    })
    .catch(err => {
      if (err.message === 'Network Error') {
        toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
      } else if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const disableGoogleAuthenticator = token => (dispatch, getState) => {
  axios({
    data: {
      token,
    },
    method: 'post',
    url: `${config.api.serverUrl}/v1/auth/disableGoogleAuthenticator`,
    headers: {
      authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(response => {
      dispatch({ type: C.TOGGLE_SHOW_GOOGLE_AUTHENTICATION_MODAL });
      dispatch({
        type: C.SET_2FA_AUTH,
        payload: false,
      });
      toastr.success(
        response.data.message.title,
        response.data.message.description,
      );
    })
    .catch(err => {
      if (err.message === 'Network Error') {
        toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
      } else if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const resendConfirmationEmail = email => {
  axios
    .post(
      `${config.api.serverUrl}/v1/auth/sendConfirmationEmail`,
      {
        email,
        isResend: true,
      },
      {
        headers: {
          [config.apiKeyHeader]: config.apiKey,
        },
      },
    )
    .then(() => {
      toastr.success(
        titles.CONFIRMATION_EMAIL,
        successes.CONFIRMATION_EMAIL_SENT(email),
      );
    })
    .catch(err => {
      if (err.message === 'Network Error') {
        toastr.error(titles.CONNECTION_ERROR, errors.SERVER_CONNECTION_LOST);
      } else if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};
