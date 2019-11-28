import { createStore, applyMiddleware } from 'redux';
import to from 'await-to-js';
import thunk from 'redux-thunk';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import config from '../config';
import { loadState, saveState } from '../localStorage'; // saveState
import { name, version } from '../../package.json';
import rootReducer from '../reducers';
import createLogger from './logger';

const sample = '{"isFirstLogin":false,"userInfo":{"wallets":[{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},{"id":66,"address":"0x093dD4591c9fe6d393a6FFA24038fefC3F5Dc748","balance":"10.0000000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":1,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-10T18:07:22.000Z"},{"id":67,"address":"0x093dD4591c9fe6d393a6FFA24038fefC3F5Dc748","balance":"99994.5821406250000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":3,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-10T18:07:22.000Z"},{"id":68,"address":"0x093dD4591c9fe6d393a6FFA24038fefC3F5Dc748","balance":"100577.9050000000000000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":4,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:47:49.000Z"}],"openOrders":[],"orderHistory":[{"id":58956,"price":"0.050000000","amount":"200.000000000","filledAmount":"200.000000000","createdAt":"2019-06-10T21:05:06.000Z","updatedAt":"2019-06-10T21:05:06.000Z","sideId":1,"statusId":1,"typeId":1,"fillTypeId":1,"pairId":3,"userId":515},{"id":72519,"price":"0.004983000","amount":"2000.000000000","filledAmount":"377.905000000","createdAt":"2019-06-11T05:47:49.000Z","updatedAt":"2019-06-11T05:48:21.000Z","sideId":1,"statusId":3,"typeId":1,"fillTypeId":1,"pairId":3,"userId":515}],"tradeHistory":[{"price":"0.000192650","amount":"6.489000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.00125010585,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000195250","amount":"29.005000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.00566322625,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000196060","amount":"1.149000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.00022527294,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000196240","amount":"19.072000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.0037426892799999997,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000197200","amount":"31.124000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.0061376528,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000198290","amount":"10.000000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.0019829,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000198590","amount":"25.411000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.00504637049,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000198680","amount":"29.733000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.005907352439999999,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000200870","amount":"31.443000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.00631595541,"timestamp":"2019-06-10T21:05:06.000Z","fee":0},{"price":"0.000201660","amount":"16.574000000","pair":"TRZ/BTC","side":"Buy","type":"Market","total":0.00334231284,"timestamp":"2019-06-10T21:05:06.000Z","fee":0}],"transactionHistory":{"withdraw":[],"deposit":[{"txHash":"0d8cc5bb0a742cb479a40888693a76f342be832dace6003e6ec663947038c46d","amount":"0.001130000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000a1cdd11d7cf68b023bdda636840f52610a968e91784395cfa5e","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T21:09:40.000Z","updatedAt":"2019-06-10T21:09:40.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"354faa76dcf92083d2e9ca11f6f4ddd4574aeae95d1589108f5dd895f37b264a","amount":"0.001130000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000a1cdd11d7cf68b023bdda636840f52610a968e91784395cfa5e","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T21:09:40.000Z","updatedAt":"2019-06-10T21:09:40.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"ac7cfa5c6f0f0f5b7476548c621694b4e34382d29d97844969cd74b9b490717c","amount":"0.001130000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000a1cdd11d7cf68b023bdda636840f52610a968e91784395cfa5e","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T21:09:40.000Z","updatedAt":"2019-06-10T21:09:40.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"da834388445caac32460e9b0f7860f846ffdd1a889d437c0eac46d6a67500d18","amount":"0.001130000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000a1cdd11d7cf68b023bdda636840f52610a968e91784395cfa5e","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T21:09:40.000Z","updatedAt":"2019-06-10T21:09:40.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"ff0c72598d6122ce5e96fdf3d05d1e4cab4a48d7ff2a84914c0f52b8cb1ae413","amount":"0.001130000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000a1cdd11d7cf68b023bdda636840f52610a968e91784395cfa5e","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T21:09:40.000Z","updatedAt":"2019-06-10T21:09:40.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"6d031f2682488433c7e4a3a4bb1cec07f86937736935dfe5df5100cb8adf4b60","amount":"0.001130000","isBankPayment":false,"blockNumber":null,"blockHash":"00000000000004363438f5791bd912d70d54ff7143496c8b931290b7c3c97e15","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T21:09:20.000Z","updatedAt":"2019-06-10T21:09:20.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"123fad833432e6b6ae905c69d6c6a69aa20f04e3036d055adb60c3c99768d229","amount":"0.000100000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000c2fcbb5bfc4c1159a653ff76a84f56e5fadc841ae71b50bd722","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T18:50:00.000Z","updatedAt":"2019-06-10T18:50:00.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"1ce20263d16ec27d35f83f94da917bb45a2f9f321ab8aacd10a442c7f88f9b1e","amount":"0.001000000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000c2fcbb5bfc4c1159a653ff76a84f56e5fadc841ae71b50bd722","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T18:50:00.000Z","updatedAt":"2019-06-10T18:50:00.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"346cf8417510d58b2c30470719a836b43595d734a2a87449399a48fcd8e392f6","amount":"0.001130000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000c2fcbb5bfc4c1159a653ff76a84f56e5fadc841ae71b50bd722","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T18:50:00.000Z","updatedAt":"2019-06-10T18:50:00.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null},{"txHash":"749ac4d6b2a586f2ac4cdcd78409da15884d3e3bf170dcc661cdb6c6469671bf","amount":"0.001130000","isBankPayment":false,"blockNumber":null,"blockHash":"0000000000000c2fcbb5bfc4c1159a653ff76a84f56e5fadc841ae71b50bd722","confirmations":"6","usdPriceAtTransactionTime":"0.000000000","createdAt":"2019-06-10T18:50:00.000Z","updatedAt":"2019-06-10T18:50:00.000Z","sourceId":null,"destinationId":65,"statusId":6,"destinationWallet":{"id":65,"address":"2N2kYksQo39V1FLEWkWB7A2rfUd21NSq9Q8","balance":"9.8877836205900000000000","reservedBalance":"0.0000000000000000000000","isExternal":false,"tokenId":2,"userId":515,"createdAt":"2019-06-10T18:07:22.000Z","updatedAt":"2019-06-11T05:48:21.000Z"},"sourceWallet":null}]},"profile":{"email":"s.farshad.k@gmail.com","timezoneId":1,"baseCurrencyId":1,"countryId":null,"profilePicUrl":null,"referralToken":"e2d25ebd1e8a03ff72c5ca9b20370c6c","firstName":"فرشاد","lastName":"کاظمی","legalFirstName":null,"legalLastName":null,"legalMiddleName":null,"driverLicenseFrontPic":null,"driverLicenseBackPic":null,"identityCardFrontPic":null,"identityCardBackPic":null,"passportPic":null,"facePic":null,"kycToken":"b3e438","verificationStatusId":1},"authStatus":{"smsEnabled":false,"twoFAEnabled":0,"phoneNumber":null},"favouritePairs":[],"favouriteCharts":[1]}}';
/* eslint-disable no-unused-vars */

// remove null/undefined from object and nested objects of it
// https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
const removeEmpty = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
    else if (obj[key] == null) delete obj[key]; // eslint-disable-line
  });
};

const loadStore = async authToken => {
  const [err, userState] = await to(
    axios({
      method: 'get',
      url: `${config.api.serverUrl}/v1/userState`,
      headers: {
        authorization: authToken,
        [config.apiKeyHeader]: config.apiKey,
      },
    }),
  );
  if (err) {
    return {};
  }
  // return JSON.parse(sample);
  return userState.data;
};

export default async function configureStore(
  initialState,
  helpersConfig,
  isServerSide,
) {
  const middleware = [thunk.withExtraArgument(helpersConfig)];

  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production
    const composeEnhancers = composeWithDevTools({
      // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
      name: `${name}@${version}`,
    });

    // https://redux.js.org/docs/api/applyMiddleware.html
    enhancer = composeEnhancers(applyMiddleware(...middleware));
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  const persistedState = loadState();

  let state = initialState;
  if (!isServerSide) {
    const authToken = localStorage.getItem('authToken');
    let userState = {};
    if (authToken) {
      userState = await loadStore(authToken);
    }

    const generalState = {
      countries: initialState.countries,
      currencies: initialState.currencies,
      timezones: initialState.timezones,
      tokens: initialState.tokens,
      pairs: initialState.pairs,
    };

    if (persistedState) {
      const {
        countries,
        pairs,
        filteredPairs,
        timezones,
        currencies,
        tokens,
        userInfo,
        ...persistedStateWithoutGeneralState
      } = persistedState;

      state = {
        ...persistedStateWithoutGeneralState,
        ...generalState,
        ...userState,
      };
    } else {
      state = {
        ...generalState,
        ...userState,
      };
    }
  }

  // remove null/undefined attributes from state
  removeEmpty(state);

  // https://redux.js.org/docs/api/createStore.html
  const store = createStore(rootReducer, state, enhancer);

  store.subscribe(() => {
    saveState(store.getState());
  });

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default),
    );
  }

  return store;
}
