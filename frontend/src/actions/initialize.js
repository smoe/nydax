/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const fetchInitialState = (url, type) => dispatch => {
  axios
    .get(url)
    .then(res => {
      dispatch({ type, payload: res.data });
    })
    .catch(err => {
      console.log(`error in fetching: ${type}`, err); // eslint-disable-line
    });
};

export const fetchUserBasedInitialState = (url, type, token) => dispatch => {
  axios
    .get(url, {
      headers: {
        Authorization: token,
      },
    })
    .then(res => {
      dispatch({ type, payload: res.data });
    })
    .catch(err => {
      console.log(`error in fetching: ${type}`, err); // eslint-disable-line
    });
};
