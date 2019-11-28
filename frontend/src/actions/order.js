/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import config from '../config';
import { increaseBalance, decreaseBalance } from './wallet';
import { validateOrder } from '../validation';
import C from '../constants/actions';

export const removeOrder = orderId => (dispatch, getState) => {
  axios({
    data: { orderId },
    method: 'post',
    url: `${config.api.serverUrl}/v1/order/cancel`,
    headers: {
      Authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      // eslint-disable-line
      if (res.status === 200) {
        toastr.success(
          'Order Cancellation',
          'Your order cancellation has been submitted successfully.',
        );
        // dispatch({
        //   type: C.REMOVE_USER_ORDER,
        //   payload: orderId,
        // });
        // toastr.success(res.data.message.title, res.data.message.description);
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

export const fetchOpenOrders = () => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/order/open`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.SET_USER_OPEN_ORDERS,
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

export const addOpenOrder = order => dispatch => {
  dispatch({
    type: C.ADD_USER_ORDER,
    payload: order,
  });
};

export const fetchOrderHistory = () => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/order/history`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      dispatch({
        type: C.SET_USER_ORDER_HISTORY,
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

export const sendNewOrder = order => (dispatch, getState) => {
  // order validation
  const orderPair = getState().pairs.find(item => item.id === order.pairId);
  const validationError = validateOrder(order, orderPair);
  if (validationError.length > 0) {
    toastr.error('Order registration error', validationError);
    return;
  }

  axios({
    data: { order: JSON.stringify(order) },
    method: 'post',
    url: `${config.api.serverUrl}/v1/order/new`,
    headers: {
      Authorization: getState().userInfo.authToken,
      [config.apiKeyHeader]: config.apiKey,
    },
  })
    .then(res => {
      if (res.status === 200) {
        toastr.success(res.data.message.title, res.data.message.description);
        // TODO: fully set all order attributes such as status here
        // dispatch(addOpenOrder(order));
        // TODO: update wallets
        const pair = getState().pairs.find(item => item.id === order.pairId);
        const baseToken = getState().tokens.find(
          item => item.symbol === pair.name.split('/')[0],
        );
        const quoteToken = getState().tokens.find(
          item => item.symbol === pair.name.split('/')[1],
        );
        if (order.sideId === 1) {
          // console.log('increase ', baseToken, '=>', order.amount,'current:',state.find(item => item.tokenId === baseToken.tokenId).balance);
          // console.log('decrease ', quoteToken, '=>', order.amount * order.price ,'current:',state.find(item => item.tokenId === quoteToken.tokenId).balance);
          dispatch(increaseBalance(baseToken.id, order.amount));
          dispatch(decreaseBalance(quoteToken.id, order.amount * order.price));
        } else {
          // console.log('decrease ', baseToken, '=>', order.amount,'current:',state.find(item => item.tokenId === baseToken.tokenId).balance);
          // console.log('increase ', quoteToken, '=>', order.amount * order.price ,'current:',state.find(item => item.tokenId === quoteToken.tokenId).balance);
          dispatch(decreaseBalance(baseToken.id, order.amount));
          dispatch(increaseBalance(quoteToken.id, order.amount * order.price));
        }
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

export const updateOrderbook = (pairName, orders) => (dispatch, getState) => {
  const selectedPair = getState().pairs.find(pair => pair.name === pairName);
  if (selectedPair)
    dispatch({
      type: C.SET_LAST_ORDERS,
      payload: { pairId: selectedPair.id, orders },
    });
};

export const getOrderBook = pairName => (dispatch, getState) => {
  axios
    .get(`${config.api.serverUrl}/v1/orderbook?pairName=${pairName}`, {
      headers: {
        Authorization: getState().userInfo.authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    })
    .then(res => {
      const selectedPair = getState().pairs.find(
        pair => pair.name === pairName,
      );
      if (selectedPair)
        dispatch({
          type: C.SET_LAST_ORDERS,
          payload: { pairId: selectedPair.id, orders: res.data },
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
