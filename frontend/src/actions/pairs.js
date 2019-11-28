/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import C from '../constants/actions';
import config from '../config';

export const calculateChange24Percentage = pair => {
  const output = (
    (pair.change24Price / (pair.lastPrice - pair.change24Price)) *
    100
  ).toFixed(2);
  return isNaN(output) ? Number(0).toFixed(2) : output; // eslint-disable-line
};

export const fetch = () => dispatch => {
  axios
    .get(`${config.api.serverUrl}/v1/pair`, {
      headers: {
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.SET_PAIRS,
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

export function setFilteredPairs(filteredPairList) {
  return {
    type: C.SET_FILTERED_PAIRS,
    payload: filteredPairList,
  };
}

export const setSelectedPair = id => (dispatch, getState) => {
  if (window.tvWidgetSimple) {
    window.tvWidgetSimple.setSymbol(
      getState().pairs.find(pair => pair.id === id).name,
      '1',
    );
  }
  if (window.tvWidgetAdvanced) {
    window.tvWidgetAdvanced.setSymbol(
      getState().pairs.find(pair => pair.id === id).name,
      '1',
    );
  }
  dispatch({
    type: C.SET_SELECTED_PAIR_ID,
    payload: id,
  });
};

export const fetchFavouritePairs = () => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/favouritePairs`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.SET_USER_FAVOURITE_PAIR_IDS,
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

export const fetchFavouriteCharts = () => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/favouriteCharts`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.SET_USER_FAVOURITE_CHARTS_IDS,
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

export const toggleFavouritePair = pairId => (dispatch, getState) => {
  // toggle favourite pair
  dispatch({
    type: C.TOGGLE_USER_FAVOURITE_PAIR_ID,
    payload: pairId,
  });

  axios({
    method: 'post',
    url: `${config.api.serverUrl}/v1/favouritePairs/${pairId}`,
    headers: {
      Authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200 && res.data.message);
      else {
        // role-back in case of any problem
        dispatch({
          type: C.TOGGLE_USER_FAVOURITE_PAIR_ID,
          payload: pairId,
        });
      }
    })
    .catch(err => {
      // role-back in case of server error
      dispatch({
        type: C.TOGGLE_USER_FAVOURITE_PAIR_ID,
        payload: pairId,
      });
      if (err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const addFavouriteChart = pairId => (dispatch, getState) => {
  // add favourite chart front side
  dispatch({
    type: C.ADD_USER_FAVOURITE_CHART_ID,
    payload: pairId,
  });

  axios({
    method: 'post',
    url: `${config.api.serverUrl}/v1/favouriteCharts/${pairId}`,
    headers: {
      Authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200 && res.data.message);
      else {
        // role-back in case of problem
        dispatch({
          type: C.REMOVE_USER_FAVOURITE_CHART_ID,
          payload: pairId,
        });
      }
    })
    .catch(err => {
      // role-back in case of server error
      dispatch({
        type: C.REMOVE_USER_FAVOURITE_CHART_ID,
        payload: pairId,
      });
      if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const removeFavouriteChart = pairId => (dispatch, getState) => {
  // remove favourite chart front side
  dispatch({
    type: C.REMOVE_USER_FAVOURITE_CHART_ID,
    payload: pairId,
  });

  axios({
    method: 'delete',
    url: `${config.api.serverUrl}/v1/favouriteCharts/${pairId}`,
    headers: {
      Authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200 && res.data.message);
      else {
        // role-back in case of problem
        dispatch({
          type: C.ADD_USER_FAVOURITE_CHART_ID,
          payload: pairId,
        });
      }
    })
    .catch(err => {
      // role-back in case of problem
      dispatch({
        type: C.ADD_USER_FAVOURITE_CHART_ID,
        payload: pairId,
      });
      if (err.response && err.response.data.error) {
        toastr.error(
          err.response.data.error.title,
          err.response.data.error.description,
        );
      }
    });
};

export const updatePair = pair => ({
  type: C.UPDATE_PAIR,
  payload: {
    ...pair,
    change24Percentage: calculateChange24Percentage(pair),
  },
});

export const updatePairs = pairs => ({
  type: C.UPDATE_PAIRS,
  payload: pairs.map(item => ({
    ...item,
    change24Percentage: calculateChange24Percentage(item),
  })),
});

// export function toggleFavouriteChart(pairId) {
//   return {
//     type: C.TOGGLE_USER_FAVOURITE_CHART_ID,
//     payload: pairId,
//   };
// }
