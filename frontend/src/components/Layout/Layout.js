import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { Online, Offline } from 'react-detect-offline';
import Joyride, { LIFECYCLE, ACTIONS, STATUS } from 'react-joyride';
// external-global styles must be imported in your JS.
import { Button } from 'react-bootstrap';
import { isIE } from 'react-device-detect';
import normalizeCss from 'normalize.css';
import axios from 'axios';
// import isReachable from 'is-reachable';
import io from 'socket.io-client';
import https from 'https';
import to from 'await-to-js';
import { toastr } from 'react-redux-toastr';
// import browserUpdate from 'browser-update';
import { arraysEqual } from '../../utils';
import VerifyAccountModal from '../../components/VerifyAccountModal';
import GetMoreInvoModal from '../../components/GetMoreInvoModal';
import CongratulationsModal from '../../components/CongratulationsModal';
import { infos, errors } from '../../constants/messages';
import { loadState } from '../../localStorage';
import config from '../../config';
// import history from '../../history';
import routes from '../../constants/routes';
import IxpSpinner from '../IxpSpinner';
import titles from '../../constants/titles';
import s from './Layout.css';
import Header from '../Header';
import Body from '../Body';
import Footer from '../../components/Footer';
import { updatePairs } from '../../actions/pairs';
import { updateLastTrades } from '../../actions/trade';
import { initializeAuthToken, revokeAuthToken } from '../../actions/user';
import { updateOrderbook } from '../../actions/order';
import BuyTokenModal from '../BuyTokenModal';
import C from '../../constants/actions';

// const sample =
//   '{"isFirstLogin":false,"userInfo":{"wallets":[{"id":1000054,"address":"2MuDHHTNaVQmWJZDezXBfNDyKiAvwcQ6Uxf","balance":"0.0607854828799999900000","reservedBalance":"0.0054345420000000000000","isExternal":false,"tokenId":2,"userId":1000016,"createdAt":"2019-06-06T22:04:23.000Z","updatedAt":"2019-06-12T07:46:46.000Z"},{"id":1000055,"address":"0xbD2F596eefb3d95Bf3eC97457080305997F1cb03","balance":"0.4900000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":1,"userId":1000016,"createdAt":"2019-06-06T22:04:25.000Z","updatedAt":"2019-06-08T08:34:54.000Z"},{"id":1000056,"address":"0xbD2F596eefb3d95Bf3eC97457080305997F1cb03","balance":"1020.0000000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":3,"userId":1000016,"createdAt":"2019-06-06T22:04:25.000Z","updatedAt":"2019-06-08T08:59:08.000Z","lockedReward":979.6916847755999},{"id":1000057,"address":"0xbD2F596eefb3d95Bf3eC97457080305997F1cb03","balance":"1734.4400000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":4,"userId":1000016,"createdAt":"2019-06-06T22:04:25.000Z","updatedAt":"2019-06-12T07:46:46.000Z"}],"openOrders":[{"id":140636,"price":"0.000026100","amount":"208.220000000","filledAmount":"0.000000000","createdAt":"2019-06-09T10:43:32.000Z","updatedAt":"2019-06-09T10:43:32.000Z","sideId":1,"statusId":2,"typeId":2,"fillTypeId":1,"pairId":3,"userId":1000016,"sellTrades":[],"buyTrades":[]}],"orderHistory":[{"id":85546,"price":"0.031400000","amount":"0.035000000","filledAmount":"0.000000000","createdAt":"2019-06-07T22:29:56.000Z","updatedAt":"2019-06-07T22:30:19.000Z","sideId":1,"statusId":3,"typeId":2,"fillTypeId":1,"pairId":1,"userId":1000016,"sellTrades":[],"buyTrades":[]},{"id":85574,"price":"0.031000000","amount":"0.040000000","filledAmount":"0.000000000","createdAt":"2019-06-07T22:31:04.000Z","updatedAt":"2019-06-07T22:33:24.000Z","sideId":2,"statusId":3,"typeId":2,"fillTypeId":1,"pairId":1,"userId":1000016,"sellTrades":[],"buyTrades":[]},{"id":85682,"price":"0.031000000","amount":"0.040000000","filledAmount":"0.000000000","createdAt":"2019-06-07T22:35:10.000Z","updatedAt":"2019-06-07T22:35:54.000Z","sideId":2,"statusId":3,"typeId":2,"fillTypeId":1,"pairId":1,"userId":1000016,"sellTrades":[],"buyTrades":[]},{"id":85896,"price":"0.031400000","amount":"0.400000000","filledAmount":"0.000000000","createdAt":"2019-06-07T22:44:03.000Z","updatedAt":"2019-06-07T22:45:12.000Z","sideId":1,"statusId":3,"typeId":2,"fillTypeId":1,"pairId":1,"userId":1000016,"sellTrades":[],"buyTrades":[]},{"id":85929,"price":"0.031400000","amount":"0.040000000","filledAmount":"0.040000000","createdAt":"2019-06-07T22:45:24.000Z","updatedAt":"2019-06-07T22:45:25.000Z","sideId":1,"statusId":1,"typeId":2,"fillTypeId":1,"pairId":1,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":89991,"price":"0.031331096","amount":"0.040000000","sellOrderId":85930,"buyOrderId":85929,"createdAt":"2019-06-07T22:45:25.000Z","updatedAt":"2019-06-07T22:45:25.000Z","pairId":1}]},{"id":99416,"price":"0.031260000","amount":"0.048700000","filledAmount":"0.000000000","createdAt":"2019-06-08T07:40:14.000Z","updatedAt":"2019-06-08T08:32:51.000Z","sideId":2,"statusId":3,"typeId":2,"fillTypeId":1,"pairId":1,"userId":1000016,"sellTrades":[],"buyTrades":[]},{"id":100838,"price":"0.031170000","amount":"0.040000000","filledAmount":"0.040000000","createdAt":"2019-06-08T08:34:52.000Z","updatedAt":"2019-06-08T08:34:54.000Z","sideId":2,"statusId":1,"typeId":2,"fillTypeId":1,"pairId":1,"userId":1000016,"sellTrades":[{"id":99785,"price":"0.031180988","amount":"0.040000000","sellOrderId":100838,"buyOrderId":100839,"createdAt":"2019-06-08T08:34:54.000Z","updatedAt":"2019-06-08T08:34:54.000Z","pairId":1}],"buyTrades":[]},{"id":101394,"price":"0.018000000","amount":"5.000000000","filledAmount":"5.000000000","createdAt":"2019-06-08T08:56:33.000Z","updatedAt":"2019-06-08T08:56:33.000Z","sideId":1,"statusId":1,"typeId":1,"fillTypeId":1,"pairId":2,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":100141,"price":"0.000036300","amount":"5.000000000","sellOrderId":101226,"buyOrderId":101394,"createdAt":"2019-06-08T08:56:33.000Z","updatedAt":"2019-06-08T08:56:33.000Z","pairId":2}]},{"id":101420,"price":"0.018000000","amount":"5.000000000","filledAmount":"5.000000000","createdAt":"2019-06-08T08:57:25.000Z","updatedAt":"2019-06-08T08:57:25.000Z","sideId":1,"statusId":1,"typeId":1,"fillTypeId":1,"pairId":2,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":100161,"price":"0.000036040","amount":"5.000000000","sellOrderId":101412,"buyOrderId":101420,"createdAt":"2019-06-08T08:57:25.000Z","updatedAt":"2019-06-08T08:57:25.000Z","pairId":2}]},{"id":101443,"price":"0.018000000","amount":"5.000000000","filledAmount":"5.000000000","createdAt":"2019-06-08T08:58:09.000Z","updatedAt":"2019-06-08T08:58:09.000Z","sideId":1,"statusId":1,"typeId":1,"fillTypeId":1,"pairId":2,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":100174,"price":"0.000035450","amount":"5.000000000","sellOrderId":101435,"buyOrderId":101443,"createdAt":"2019-06-08T08:58:09.000Z","updatedAt":"2019-06-08T08:58:09.000Z","pairId":2}]},{"id":101474,"price":"0.017000000","amount":"5.000000000","filledAmount":"5.000000000","createdAt":"2019-06-08T08:59:08.000Z","updatedAt":"2019-06-08T08:59:08.000Z","sideId":1,"statusId":1,"typeId":1,"fillTypeId":1,"pairId":2,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":100193,"price":"0.000037080","amount":"5.000000000","sellOrderId":101469,"buyOrderId":101474,"createdAt":"2019-06-08T08:59:08.000Z","updatedAt":"2019-06-08T08:59:08.000Z","pairId":2}]},{"id":101544,"price":"0.017000000","amount":"5.000000000","filledAmount":"5.000000000","createdAt":"2019-06-08T09:01:48.000Z","updatedAt":"2019-06-08T09:01:48.000Z","sideId":1,"statusId":1,"typeId":1,"fillTypeId":1,"pairId":3,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":100234,"price":"0.000033690","amount":"5.000000000","sellOrderId":101542,"buyOrderId":101544,"createdAt":"2019-06-08T09:01:48.000Z","updatedAt":"2019-06-08T09:01:48.000Z","pairId":3}]},{"id":101551,"price":"0.017000000","amount":"5.000000000","filledAmount":"5.000000000","createdAt":"2019-06-08T09:02:01.000Z","updatedAt":"2019-06-08T09:02:01.000Z","sideId":1,"statusId":1,"typeId":1,"fillTypeId":1,"pairId":3,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":100240,"price":"0.000035980","amount":"5.000000000","sellOrderId":101536,"buyOrderId":101551,"createdAt":"2019-06-08T09:02:01.000Z","updatedAt":"2019-06-08T09:02:01.000Z","pairId":3}]},{"id":140206,"price":"0.000031570","amount":"312.220000000","filledAmount":"312.220000000","createdAt":"2019-06-09T10:26:02.000Z","updatedAt":"2019-06-09T10:27:46.000Z","sideId":1,"statusId":1,"typeId":2,"fillTypeId":1,"pairId":3,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":126159,"price":"0.000031570","amount":"50.949000000","sellOrderId":140205,"buyOrderId":140206,"createdAt":"2019-06-09T10:26:02.000Z","updatedAt":"2019-06-09T10:26:02.000Z","pairId":3},{"id":126160,"price":"0.000031570","amount":"159.000000000","sellOrderId":140210,"buyOrderId":140206,"createdAt":"2019-06-09T10:26:07.000Z","updatedAt":"2019-06-09T10:26:07.000Z","pairId":3},{"id":126175,"price":"0.000031570","amount":"102.271000000","sellOrderId":140253,"buyOrderId":140206,"createdAt":"2019-06-09T10:27:46.000Z","updatedAt":"2019-06-09T10:27:46.000Z","pairId":3}]},{"id":140207,"price":"0.000031570","amount":"312.220000000","filledAmount":"312.220000000","createdAt":"2019-06-09T10:26:03.000Z","updatedAt":"2019-06-09T10:31:41.000Z","sideId":1,"statusId":1,"typeId":2,"fillTypeId":1,"pairId":3,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":126176,"price":"0.000031570","amount":"22.729000000","sellOrderId":140253,"buyOrderId":140207,"createdAt":"2019-06-09T10:27:46.000Z","updatedAt":"2019-06-09T10:27:46.000Z","pairId":3},{"id":126181,"price":"0.000031570","amount":"150.000000000","sellOrderId":140264,"buyOrderId":140207,"createdAt":"2019-06-09T10:28:11.000Z","updatedAt":"2019-06-09T10:28:11.000Z","pairId":3},{"id":126190,"price":"0.000031570","amount":"99.000000000","sellOrderId":140280,"buyOrderId":140207,"createdAt":"2019-06-09T10:28:56.000Z","updatedAt":"2019-06-09T10:28:56.000Z","pairId":3},{"id":126228,"price":"0.000031570","amount":"40.491000000","sellOrderId":140345,"buyOrderId":140207,"createdAt":"2019-06-09T10:31:41.000Z","updatedAt":"2019-06-09T10:31:41.000Z","pairId":3}]},{"id":194319,"price":"0.000035000","amount":"100.000000000","filledAmount":"100.000000000","createdAt":"2019-06-12T07:46:46.000Z","updatedAt":"2019-06-12T07:46:46.000Z","sideId":1,"statusId":1,"typeId":2,"fillTypeId":1,"pairId":3,"userId":1000016,"sellTrades":[],"buyTrades":[{"id":158490,"price":"0.000034920","amount":"23.000000000","sellOrderId":190421,"buyOrderId":194319,"createdAt":"2019-06-12T07:46:46.000Z","updatedAt":"2019-06-12T07:46:46.000Z","pairId":3},{"id":158491,"price":"0.000034940","amount":"77.000000000","sellOrderId":190333,"buyOrderId":194319,"createdAt":"2019-06-12T07:46:46.000Z","updatedAt":"2019-06-12T07:46:46.000Z","pairId":3}]}],"tradeHistory":[{"price":"0.031180988","orderId":100838,"amount":"0.040000000","pair":"ETH/BTC","side":"Sell","type":"Limit","total":0.0012472395200000001,"timestamp":"2019-06-08T08:34:54.000Z","fee":0},{"price":"0.031331096","orderId":85929,"amount":"0.040000000","pair":"ETH/BTC","side":"Buy","type":"Limit","total":0.0012532438400000001,"timestamp":"2019-06-07T22:45:25.000Z","fee":0},{"price":"0.000036300","orderId":101394,"amount":"5.000000000","pair":"INVO/BTC","side":"Buy","type":"Market","total":0.00018150000000000002,"timestamp":"2019-06-08T08:56:33.000Z","fee":0},{"price":"0.000036040","orderId":101420,"amount":"5.000000000","pair":"INVO/BTC","side":"Buy","type":"Market","total":0.0001802,"timestamp":"2019-06-08T08:57:25.000Z","fee":0},{"price":"0.000035450","orderId":101443,"amount":"5.000000000","pair":"INVO/BTC","side":"Buy","type":"Market","total":0.00017725,"timestamp":"2019-06-08T08:58:09.000Z","fee":0},{"price":"0.000037080","orderId":101474,"amount":"5.000000000","pair":"INVO/BTC","side":"Buy","type":"Market","total":0.00018539999999999998,"timestamp":"2019-06-08T08:59:08.000Z","fee":0},{"price":"0.000033690","orderId":101544,"amount":"5.000000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.00016845,"timestamp":"2019-06-08T09:01:48.000Z","fee":0},{"price":"0.000035980","orderId":101551,"amount":"5.000000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.00017989999999999998,"timestamp":"2019-06-08T09:02:01.000Z","fee":0},{"price":"0.000031570","orderId":140206,"amount":"50.949000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.0016084599299999998,"timestamp":"2019-06-09T10:26:02.000Z","fee":0},{"price":"0.000031570","orderId":140206,"amount":"159.000000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.00501963,"timestamp":"2019-06-09T10:26:07.000Z","fee":0},{"price":"0.000031570","orderId":140206,"amount":"102.271000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.0032286954699999996,"timestamp":"2019-06-09T10:27:46.000Z","fee":0},{"price":"0.000031570","orderId":140207,"amount":"22.729000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.00071755453,"timestamp":"2019-06-09T10:27:46.000Z","fee":0},{"price":"0.000031570","orderId":140207,"amount":"150.000000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.004735499999999999,"timestamp":"2019-06-09T10:28:11.000Z","fee":0},{"price":"0.000031570","orderId":140207,"amount":"99.000000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.00312543,"timestamp":"2019-06-09T10:28:56.000Z","fee":0},{"price":"0.000031570","orderId":140207,"amount":"40.491000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.0012783008699999998,"timestamp":"2019-06-09T10:31:41.000Z","fee":0},{"price":"0.000034920","orderId":194319,"amount":"23.000000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.0008031599999999999,"timestamp":"2019-06-12T07:46:46.000Z","fee":0},{"price":"0.000034940","orderId":194319,"amount":"77.000000000","pair":"TRZ/BTC","side":"Buy","type":"Limit","total":0.00269038,"timestamp":"2019-06-12T07:46:46.000Z","fee":0}],"transactionHistory":{"withdraw":[{"txHash":"0xb212f8ac4b05e970d45e5d94264c056662d88837b412e1d03f06cf4890acc426","amount":"0.500000000","isBankPayment":false,"blockNumber":"5744421","blockHash":null,"confirmations":"11","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-06T22:13:56.000Z","updatedAt":"2019-06-06T22:16:50.000Z","sourceId":1000055,"destinationId":1000038,"statusId":6,"sourceWallet":{"id":1000055,"address":"0xbD2F596eefb3d95Bf3eC97457080305997F1cb03","balance":"0.4900000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":1,"userId":1000016,"createdAt":"2019-06-06T22:04:25.000Z","updatedAt":"2019-06-08T08:34:54.000Z"},"destinationWallet":{"id":1000038,"address":"0x8E4311182f57cf32a39f70508c3c6f1b45C067fA","balance":"1.5400000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":1,"userId":1000011,"createdAt":"2019-06-05T22:23:57.000Z","updatedAt":"2019-06-08T19:52:58.000Z"}}],"deposit":[{"txHash":"9b0ec4e155482d7d6b554a8706f570dbdde4c0e5e0a05803617f99b14ce41b14","amount":"0.005831700","isBankPayment":false,"blockNumber":null,"blockHash":"000000000000007322a2bdb985bceddcc0a011b9c84102afbce14d20fd9c2d0f","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-06T23:16:40.000Z","updatedAt":"2019-06-06T23:16:40.000Z","sourceId":1000037,"destinationId":1000054,"statusId":6,"destinationWallet":{"id":1000054,"address":"2MuDHHTNaVQmWJZDezXBfNDyKiAvwcQ6Uxf","balance":"0.0607854828799999900000","reservedBalance":"0.0054345420000000000000","isExternal":false,"tokenId":2,"userId":1000016,"createdAt":"2019-06-06T22:04:23.000Z","updatedAt":"2019-06-12T07:46:46.000Z"},"sourceWallet":{"id":1000037,"address":"2MwN6r58P7cir822hq58sf1LZWktWgQQfpj","balance":"0.0143373756800000020000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":1000011,"createdAt":"2019-06-05T22:23:54.000Z","updatedAt":"2019-06-12T01:31:17.000Z"}},{"txHash":"27692fa32a7fb2e4b9cc5b86744428f6b6aac0a18d939a3ec4b869212143543b","amount":"0.074674140","isBankPayment":false,"blockNumber":null,"blockHash":"000000000001fd249beeac37810f5639fec54e98308d5ce54b7767ad76b170ae","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-06T23:12:20.000Z","updatedAt":"2019-06-06T23:12:20.000Z","sourceId":null,"destinationId":1000054,"statusId":6,"destinationWallet":{"id":1000054,"address":"2MuDHHTNaVQmWJZDezXBfNDyKiAvwcQ6Uxf","balance":"0.0607854828799999900000","reservedBalance":"0.0054345420000000000000","isExternal":false,"tokenId":2,"userId":1000016,"createdAt":"2019-06-06T22:04:23.000Z","updatedAt":"2019-06-12T07:46:46.000Z"},"sourceWallet":null},{"txHash":"7176d4087f815a72bbf6a89fc03cab76825d36ce64b066ba44626bc5babebc1e","amount":"0.010000000","isBankPayment":false,"blockNumber":null,"blockHash":"000000000001fd249beeac37810f5639fec54e98308d5ce54b7767ad76b170ae","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-06T23:12:20.000Z","updatedAt":"2019-06-06T23:12:20.000Z","sourceId":null,"destinationId":1000054,"statusId":6,"destinationWallet":{"id":1000054,"address":"2MuDHHTNaVQmWJZDezXBfNDyKiAvwcQ6Uxf","balance":"0.0607854828799999900000","reservedBalance":"0.0054345420000000000000","isExternal":false,"tokenId":2,"userId":1000016,"createdAt":"2019-06-06T22:04:23.000Z","updatedAt":"2019-06-12T07:46:46.000Z"},"sourceWallet":null},{"txHash":"6a8103d9-54d2-41d1-8e38-081d61997f67","amount":"1000.000000000","isBankPayment":true,"blockNumber":null,"blockHash":null,"confirmations":"0","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-06T22:12:30.000Z","updatedAt":"2019-06-06T22:12:30.000Z","sourceId":null,"destinationId":1000057,"statusId":6,"destinationWallet":{"id":1000057,"address":"0xbD2F596eefb3d95Bf3eC97457080305997F1cb03","balance":"1734.4400000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":4,"userId":1000016,"createdAt":"2019-06-06T22:04:25.000Z","updatedAt":"2019-06-12T07:46:46.000Z"},"sourceWallet":null},{"txHash":"d9fa612a-ac48-42e4-801d-2119c2c1f349","amount":"1000.000000000","isBankPayment":true,"blockNumber":null,"blockHash":null,"confirmations":"0","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-06T22:11:45.000Z","updatedAt":"2019-06-06T22:11:45.000Z","sourceId":null,"destinationId":1000056,"statusId":6,"destinationWallet":{"id":1000056,"address":"0xbD2F596eefb3d95Bf3eC97457080305997F1cb03","balance":"1020.0000000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":3,"userId":1000016,"createdAt":"2019-06-06T22:04:25.000Z","updatedAt":"2019-06-08T08:59:08.000Z"},"sourceWallet":null},{"txHash":"0x72bb35a02d12037634907a4516f7c91ef6547fb66ca35389fbb3b36a82362408","amount":"1.000000000","isBankPayment":false,"blockNumber":"5744398","blockHash":null,"confirmations":"11","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-06T22:08:50.000Z","updatedAt":"2019-06-06T22:11:30.000Z","sourceId":null,"destinationId":1000055,"statusId":6,"destinationWallet":{"id":1000055,"address":"0xbD2F596eefb3d95Bf3eC97457080305997F1cb03","balance":"0.4900000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":1,"userId":1000016,"createdAt":"2019-06-06T22:04:25.000Z","updatedAt":"2019-06-08T08:34:54.000Z"},"sourceWallet":null}]},"profile":{"email":"zangeneherfan@gmail.com","timezoneId":1,"baseCurrencyId":1,"countryId":105,"profilePicUrl":null,"referralToken":"fcf77534185b10e4ec955798a8568a48","firstName":"Erfan","lastName":"Zangeneh","legalFirstName":"Erfan","legalLastName":"Zangeneh","legalMiddleName":"zangeneherfan","driverLicenseFrontPic":null,"driverLicenseBackPic":null,"identityCardFrontPic":null,"identityCardBackPic":null,"passportPic":"https://dev.nydax.com:2083/images/users/213ae1e4-4e32-4724-9e98-05d057f33f07","facePic":"https://dev.nydax.com:2083/images/users/067c6043-d10b-489a-91c6-f5b6e083dafa","kycToken":"080b61","verificationStatusId":4},"authStatus":{"smsEnabled":false,"twoFAEnabled":0,"phoneNumber":null},"favouritePairs":[1,3],"favouriteCharts":[1,2,3]}}';

const socket = io(config.api.websocketUrl, {
  secure: true,
  transports: ['websocket'],
});

let d = new Date();
let lastSecondPrice = Math.round(d.getTime() / 1000);
let previousSecondPrice = 0;
let pairs = [];

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      scroll: 0,
      // backendIsReachable: true,
      showTour: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.getTourSteps = this.getTourSteps.bind(this);
    this.handleNextSteps = this.handleNextSteps.bind(this);
    this.addPriceSocketListener = this.addPriceSocketListener.bind(this);
    this.addOrderbookSocketListener = this.addOrderbookSocketListener.bind(
      this,
    );
  }

  async componentDidMount() {
    const browserUpdate = require('browser-update'); // eslint-disable-line
    browserUpdate({
      required: {
        e: -1,
        i: -6,
        f: -6,
        o: -6,
        s: 10.1,
        c: '56.0.3729.131',
        samsung: 7.0,
        vivaldi: 1.2,
      },
      insecure: true,
    });
    // this.isFirefox = typeof InstallTrigger !== 'undefined';
    // this.isChrome =
    //   !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if (isIE) return;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ showTour: this.props.showTour });
    window.addEventListener('scroll', this.handleScroll);
    // setTimeout(() => {
    //   // this.setState({ loading: false });
    //   // FIXME: take a better solution for this problem
    //   const theme = ` ${this.props.theme}`.slice(1);
    //   this.props.setTheme(
    //     ['light', 'dark', 'darkCmc'].filter(item => item !== theme)[0],
    //   );loading
    //   this.props.setTheme(theme);
    //   // this.props.setTheme();
    // }, 500);

    this.props.dispatch(initializeAuthToken());
    let authToken = localStorage.getItem('authToken');

    let err;
    let isLoggedIn = true;
    let response;
    if (authToken) {
      [err, response] = await to(
        axios({
          data: { authToken },
          method: 'post',
          url: `${config.api.serverUrl}/v1/auth/refreshToken`,
          headers: {
            [config.apiKeyHeader]: config.apiKey,
          },
        }),
      );
      if (err) {
        // revoke auth token
        this.props.revokeAuthToken();
        isLoggedIn = false;
      } else if (response && response.data) {
        // refresh auth token
        localStorage.setItem('authToken', response.data.token);
        this.props.dispatch(initializeAuthToken());
        authToken = response.data.token;
      }
    } else {
      this.props.revokeAuthToken();
      isLoggedIn = false;
    }

    if (isLoggedIn === false) {
      if (
        // err.response &&
        // err.response.status === 401 &&
        ![
          routes.DASHBOARD,
          routes.TRADING_PLATFORM,
          routes.STARTUP_INFO,
        ].includes(this.props.currentRoute)
      ) {
        // history.push(routes.LOGIN);
        window.location.href = `${routes.LOGIN}?return_to=${
          this.props.currentRoute
        }`;
      } else {
        setTimeout(() => {
          const theme = ` ${this.props.theme}`.slice(1);

          this.props.setTheme(
            ['light', 'dark', 'darkCmc'].filter(item => item !== theme)[0],
          );
          this.props.setTheme(theme);
          this.setState({ loading: false }); // eslint-disable-line
        }, 100);
      }
    } else {
      this.props.setIsLoggedIn();

      const theme = ` ${this.props.theme}`.slice(1);
      this.props.setTheme(
        ['light', 'dark', 'darkCmc'].filter(item => item !== theme)[0],
      );
      this.props.setTheme(theme);
      this.setState({ loading: false }); // eslint-disable-line

      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      setInterval(async () => {
        let state;
        const dateNow = new Date();

        if (
          [0, 1, 2, 3, 4].includes(
            Math.floor(dateNow.getTime() / 1000) %
              (config.authTokenExpiryTime / 2),
          )
        ) {
          [err, response] = await to(
            axios({
              data: { authToken },
              method: 'post',
              url: `${config.api.serverUrl}/v1/auth/refreshToken`,
              headers: {
                [config.apiKeyHeader]: config.apiKey,
              },
            }),
          );
          if (err) {
            // token is not valid.
          } else if (response && response.data) {
            // refresh auth token
            localStorage.setItem('authToken', response.data.token);
            this.props.dispatch(initializeAuthToken());
            authToken = response.data.token;
          }
        }

        // if (error.response && error.response.status === 401) {
        //   this.props.revokeAuthToken();
        //   return;
        // }
        const [error, fetchedState] = await to(
          axios({
            method: 'get',
            url: `${config.api.serverUrl}/v1/userState`,
            httpsAgent: agent,
            headers: {
              authorization: authToken,
              [config.apiKeyHeader]: config.apiKey,
            },
          }),
        );
        if (error) {
          state = { userInfo: {} };
        } else {
          state = fetchedState.data;
          // state = JSON.parse(sample);

          if (
            state.isFirstLogin &&
            this.props.congratulationsModalSeen === false
          ) {
            this.props.toggleCongratulationsModalSeen();
          }

          if (
            !arraysEqual(
              this.props.userInfo.wallets.map(item => item.balance),
              state.userInfo.wallets.map(item => item.balance),
            )
          ) {
            this.props.dispatch({
              type: C.SET_USER_WALLETS,
              payload: state.userInfo.wallets,
            });
          }

          const previousTransactionHistory = loadState().userInfo
            .transactionHistory;

          const previousTradeHistory = loadState().userInfo.tradeHistory;

          if (
            previousTransactionHistory.deposit.length <
            state.userInfo.transactionHistory.deposit.length
          ) {
            const lastTransaction =
              state.userInfo.transactionHistory.deposit[0];
            const wallet = this.props.wallets.find(
              item =>
                item.id === lastTransaction.sourceId ||
                item.id === lastTransaction.destinationId,
            );
            const token = this.props.tokens.find(
              item => item.id === wallet.tokenId,
            );
            if (!lastTransaction.isBankPayment)
              toastr.info(
                infos.DEPOSIT_OCCURANCE(token.symbol, lastTransaction.amount),
              );
          }

          if (
            previousTradeHistory.length < state.userInfo.tradeHistory.length
          ) {
            toastr.info(infos.TRADE_OCCURANCE);
          }

          if (
            !arraysEqual(
              this.props.userInfo.transactionHistory.withdraw.map(
                item => item.id,
              ),
              state.userInfo.transactionHistory.withdraw.map(item => item.id),
            ) ||
            !arraysEqual(
              this.props.userInfo.transactionHistory.deposit.map(
                item => item.id,
              ),
              state.userInfo.transactionHistory.deposit.map(item => item.id),
            )
          ) {
            this.props.dispatch({
              type: C.SET_USER_TRANSACTION_HISTORY,
              payload: state.userInfo.transactionHistory,
            });
          }

          if (
            !arraysEqual(
              this.props.userInfo.tradeHistory.map(item => item.timestamp),
              state.userInfo.tradeHistory.map(item => item.timestamp),
            )
          ) {
            this.props.dispatch({
              type: C.SET_USER_TRADE_HISTORY,
              payload: state.userInfo.tradeHistory,
            });
          }

          if (
            !arraysEqual(
              this.props.userInfo.openOrders.map(
                item => `${item.id}+${item.statusId}`,
              ),
              state.userInfo.openOrders.map(
                item => `${item.id}+${item.statusId}`,
              ),
            )
          ) {
            this.props.dispatch({
              type: C.SET_USER_OPEN_ORDERS,
              payload: state.userInfo.openOrders,
            });
          }

          if (
            !arraysEqual(
              this.props.userInfo.orderHistory.map(
                item => `${item.id}+${item.statusId}`,
              ),
              state.userInfo.orderHistory.map(
                item => `${item.id}+${item.statusId}`,
              ),
            )
          ) {
            this.props.dispatch({
              type: C.SET_USER_ORDER_HISTORY,
              payload: state.userInfo.orderHistory,
            });
          }
        }
      }, 5000);
    }

    for (let i = 0; i < this.props.pairs.length; i += 1) {
      const pair = this.props.pairs[i];
      this.addPriceSocketListener(pair.name);
      if (pair.id === this.props.selectedPairId) {
        this.addOrderbookSocketListener(pair.name);
      } else {
        socket.off(`${pair.name}_orderbook`);
        socket.off(`${pair.name}_trade`);
      }
      // this.props.getOrderBook(pair.name);
    }

    // setInterval(async () => {
    //   const backendIsReachable = await isReachable(config.api.serverUrl);
    //   this.setState({ backendIsReachable });
    // }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRoute !== this.props.currentRoute) {
      if (!nextProps.isLoggedIn) {
        // history.push(routes.LOGIN);
        // window.location.href = routes.LOGIN;
      } else {
        this.props.setCurrentRoute(nextProps.currentRoute);
      }
    }
    if (nextProps.selectedPairId !== this.props.selectedPairId) {
      for (let i = 0; i < this.props.pairs.length; i += 1) {
        const pair = this.props.pairs[i];
        if (pair.id === nextProps.selectedPairId) {
          this.addOrderbookSocketListener(pair.name);
        } else {
          socket.off(`${pair.name}_orderbook`);
          socket.off(`${pair.name}_trade`);
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getTourSteps(route) {
    switch (route) {
      case routes.DASHBOARD:
        return this.props.tourSteps.dashboard;
      case routes.DEPOSIT:
        return this.props.tourSteps.deposit;
      case routes.WITHDRAW:
        return this.props.tourSteps.withdraw;
      case routes.TRADING_PLATFORM:
        return this.props.tourSteps.tradingPlatform;
      case routes.SETTINGS:
        return this.props.tourSteps.settings;
      default:
        return [];
    }
  }

  addOrderbookSocketListener(pairName) {
    let lastSecond = Math.round(d.getTime() / 1000);
    let previousSecond = 0;
    socket.on(`${pairName}_orderbook`, data => {
      if (lastSecond > previousSecond) {
        const { type, payload } = JSON.parse(data);
        if (type === 'orderbook')
          this.props.dispatch(updateOrderbook(pairName, payload));
        previousSecond = lastSecond;
      }
      d = new Date();
      lastSecond = Math.round(d.getTime() / 1000);
    });
    socket.on(`${pairName}_trade`, data => {
      this.props.dispatch(updateLastTrades(pairName, data));
    });
  }

  addPriceSocketListener(pairName) {
    socket.on(`${pairName}_price`, data => {
      const { payload } = JSON.parse(data);
      pairs.push(payload);
      if (lastSecondPrice > previousSecondPrice) {
        this.props.dispatch(updatePairs(pairs));
        previousSecondPrice = lastSecondPrice;
        pairs = [];
      }
      d = new Date();
      lastSecondPrice = Math.round(d.getTime() / 1000);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleNextSteps(route, data) {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      this.props.skipTour();
    }
    if (
      data.action === ACTIONS.NEXT &&
      data.lifecycle === LIFECYCLE.COMPLETE &&
      data.status === STATUS.FINISHED
    )
      switch (route) {
        case routes.DASHBOARD:
          window.location.href = routes.TRADING_PLATFORM;
          break;
        case routes.DEPOSIT:
          window.location.href = routes.WITHDRAW;
          break;
        case routes.WITHDRAW:
          window.location.href = routes.SETTINGS;
          break;
        case routes.TRADING_PLATFORM:
          window.location.href = routes.DEPOSIT;
          break;
        case routes.SETTINGS:
          this.props.skipTour();
          break;
        default:
          break;
      }
  }

  handleScroll() {
    this.setState({
      scroll: window.pageYOffset,
    });
  }

  render() {
    if (isIE)
      return (
        <span>
          IE is not supported. Please use the lastest version of
          Chrome/Firefox/Safari.
        </span>
      );
    // FIXME: change / to this.props.currentRoute
    const tourStepsOfRoute = this.getTourSteps(this.props.currentRoute);
    return (
      <Body>
        {this.state.loading ? (
          <div style={{ height: '100vh' }}>
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <IxpSpinner />
            </div>
          </div>
        ) : (
          <React.Fragment>
            <Joyride
              steps={tourStepsOfRoute}
              run={this.state.showTour}
              continuous
              showSkipButton
              scrollToFirstStep
              // FIXME: change / to this.props.currentRoute
              callback={data =>
                this.handleNextSteps(this.props.currentRoute, data)
              }
            />
            {this.props.showDisclaimer && (
              <div>
                <div
                  className={s.offlineText}
                  style={
                    this.state.scroll > 45
                      ? { position: 'fixed' }
                      : { position: 'relative' }
                  }
                >
                  <span>
                    {errors.THIS_IS_BETA}{' '}
                    <Button
                      onClick={this.props.disclaimerSeen}
                      bsStyle="success"
                    >
                      I Understand
                    </Button>
                  </span>
                </div>
                <div
                  style={
                    this.state.scroll > 40
                      ? { paddingTop: '40px' }
                      : { paddingTop: '0px' }
                  }
                />
              </div>
            )}
            {/* <Offline>
              <div
                className={s.offlineText}
                style={
                  this.state.scroll > 40
                    ? { position: 'fixed' }
                    : { position: 'relative' }
                }
              >
                {errors.INTERNET_CONNECTION_LOST}
              </div>
              <div
                style={
                  this.state.scroll > 40
                    ? { paddingTop: '40px' }
                    : { paddingTop: '0px' }
                }
              />
            </Offline>
            <Online>
              {!this.state.backendIsReachable && (
                <div>
                  <div
                    className={s.offlineText}
                    style={
                      this.state.scroll > 40
                        ? { position: 'fixed' }
                        : { position: 'relative' }
                    }
                  >
                    {errors.SERVER_CONNECTION_LOST}
                  </div>
                  <div
                    style={
                      this.state.scroll > 40
                        ? { paddingTop: '40px' }
                        : { paddingTop: '0px' }
                    }
                  />
                </div>
              )}
            </Online> */}
            <Header
              showNav={this.props.title !== titles.TRADING_PLATFORM}
              showAdvancedHeader={this.props.title === titles.TRADING_PLATFORM}
            />
            <div className={s.contentConatainer}>{this.props.children}</div>
            <Footer />
            <VerifyAccountModal />
            {this.props.isLoggedIn && <BuyTokenModal />}
            {this.props.isLoggedIn && <GetMoreInvoModal />}
            <CongratulationsModal />
          </React.Fragment>
        )}
      </Body>
    );
  }
}

Layout.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setCurrentRoute: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.object).isRequired,
  wallets: PropTypes.arrayOf(PropTypes.object).isRequired,
  tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  showTour: PropTypes.bool.isRequired,
  skipTour: PropTypes.func.isRequired,
  tourSteps: PropTypes.object.isRequired, // eslint-disable-line
  disclaimerSeen: PropTypes.func.isRequired,
  showDisclaimer: PropTypes.bool.isRequired,
  // getOrderBook: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  selectedPairId: PropTypes.number.isRequired,
  userInfo: PropTypes.object.isRequired, // eslint-disable-line
  revokeAuthToken: PropTypes.func.isRequired,
  congratulationsModalSeen: PropTypes.bool.isRequired,
  toggleCongratulationsModalSeen: PropTypes.func.isRequired,
};

const mapState = state => ({
  currentRoute: state.currentRoute,
  isLoggedIn: state.isLoggedIn,
  showTour: state.showTour,
  tourSteps: state.tourSteps,
  pairs: state.pairs,
  wallets: state.userInfo.wallets,
  tokens: state.tokens,
  showDisclaimer: state.showDisclaimer,
  theme: state.theme,
  selectedPairId: state.selectedPairId,
  userInfo: state.userInfo,
  congratulationsModalSeen: state.congratulationsModalSeen,
});

const mapDispatch = dispatch => ({
  setIsLoggedIn() {
    dispatch({ type: C.SET_IS_LOGGED_IN, payload: true });
  },
  setCurrentRoute(currentRoute) {
    dispatch({
      type: C.SET_CURRENT_ROUTE,
      payload: currentRoute,
    });
  },
  setTheme(theme) {
    dispatch({ type: C.SET_THEME, payload: theme });
  },
  dispatch(action) {
    dispatch(action);
  },
  skipTour() {
    dispatch({ type: C.SKIP_TOUR });
  },
  disclaimerSeen() {
    dispatch({ type: C.DISLAIMER_SEEN });
  },
  // getOrderBook(pairName) {
  //   dispatch(getOrderBook(pairName));
  // },
  revokeAuthToken() {
    dispatch(revokeAuthToken(false));
  },
  toggleCongratulationsModalSeen() {
    dispatch({ type: C.TOGGLE_CONGRATULATIONS_MODAL_SEEN });
  },
});

export default connect(
  mapState,
  mapDispatch,
)(withStyles(normalizeCss, s)(Layout));
