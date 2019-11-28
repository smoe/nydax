import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import user from './user';
import runtime from './runtime';
import theme from './theme';
import countries from './countries';
import currencies from './currencies';
import timezones from './timezones';
import twoFAEnabled from './twoFAEnabled';
import smsEnabled from './smsEnabled';
import sessions from './sessions';
import showChangePasswordModal from './showChangePasswordModal';
import showBuyTokenModal from './showBuyTokenModal';
import showUploadProfilePicModal from './showUploadProfilePicModal';
import showVerifyIdentityModal from './showVerifyIdentityModal';
import showSMSAuthenticationModal from './showSMSAuthenticationModal';
import showGoogleAuthenticationModal from './showGoogleAuthenticationModal';
import showInviteFriendsModal from './showInviteFriendsModal';
import showGetMoreInvoModal from './showGetMoreInvoModal';
import pairs from './pairs';
import profile from './profile';
import authToken from './authToken';
import isUploadingProfilePic from './isUploadingProfilePic';
import profilePicUploadProgress from './profilePicUploadProgress';
import withdrawalLimit24 from './withdrawalLimit24';
import accountActivity from './accountActivity';
import favouritePairs from './favouritePairs';
import favouriteCharts from './favouriteCharts';
import tokens from './tokens';
import depthChartData from './depthChartData';
import selectedPairId from './selectedPairId';
import selectedTokenId from './selectedTokenId';
import filteredPairs from './filteredPairs';
import lastOrders from './lastOrders';
import lastTrades from './lastTrades';
import openOrders from './openOrders';
import feeDiscountFactor from './feeDiscountFactor';
import tradeHistory from './tradeHistory';
import transactionHistory from './transactionHistory';
import orderHistory from './orderHistory';
import wallets from './wallets';
import currentRoute from './currentRoute';
import qrUrl from './qrUrl';
import twoFactorAuthSecret from './twoFactorAuthSecret';
import tvChartIsReady from './tvChartIsReady';
import isLoggedIn from './isLoggedIn';
import phoneNumber from './phoneNumber';
import tokenInfo from './tokenInfo';
import tokenSentimentInfo from './tokenSentimentInfo';
import showTour from './showTour';
import showDisclaimer from './showDisclaimer';
import tourSteps from './tourSteps';
import tradingPlatformLayout from './tradingPlatformLayout';
import withdrawing from './withdrawing';
import tradingPlatformGridIsLocked from './tradingPlatformGridIsLocked';
import initialTokenIdForBuy from './initialTokenIdForBuy';
import congratulationsModalSeen from './congratulationsModalSeen';

export default combineReducers({
  toastr: toastrReducer,
  user,
  runtime,
  theme,
  countries,
  currencies,
  timezones,
  userInfo: combineReducers({
    authToken,
    authStatus: combineReducers({
      twoFAEnabled,
      smsEnabled,
      qrUrl,
      twoFactorAuthSecret,
      phoneNumber,
    }),
    profile,
    sessions,
    accountActivity,
    wallets,
    transactionHistory,
    tradeHistory,
    orderHistory,
    openOrders,
    feeDiscountFactor,
    withdrawalLimit24,
    favouritePairs,
    favouriteCharts,
  }),
  tokens,
  pairs,
  filteredPairs,
  selectedPairId,
  selectedTokenId,
  lastOrders,
  lastTrades,
  depthChartData,
  showChangePasswordModal,
  showBuyTokenModal,
  showUploadProfilePicModal,
  showVerifyIdentityModal,
  showSMSAuthenticationModal,
  showGoogleAuthenticationModal,
  showInviteFriendsModal,
  showDisclaimer,
  showGetMoreInvoModal,
  tradingPlatformGridIsLocked,
  withdrawing,
  isUploadingProfilePic,
  profilePicUploadProgress,
  currentRoute,
  tvChartIsReady,
  isLoggedIn,
  tokenInfo,
  tokenSentimentInfo,
  showTour,
  tourSteps,
  tradingPlatformLayout,
  initialTokenIdForBuy,
  congratulationsModalSeen,
});
