import to from 'await-to-js';
import express from 'express';
import { Op } from 'sequelize';
import {
  Wallet,
  Order,
  Trade,
  Transaction,
  UnconfirmedTransaction,
  User,
  FavouriteCharts,
  FavouritePairs,
  UserProfile,
  UserAuthStatus,
  UserVerificationStatus,
  Pair,
  UserLogin,
  Reward,
} from '../models';
import { errors, titles } from '../constants/messages';
import { resError } from '../utils';

/* eslint-disable prefer-const */

const app = express();

function add(accumulator, a) {
  return accumulator + a;
}

app.get('/', async (req, res) => {
  let err;
  let wallets;
  let openOrders;
  let orderHistory;
  let sellTrades;
  let buyTrades;
  let favouritePairs;
  let favouriteCharts;
  let userAuthStatus;
  let userLogins;
  let rewards;

  [err, wallets] = await to(
    Wallet.findAll({
      where: {
        userId: req.user.id,
      },
    }),
  );

  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, rewards] = await to(
    Reward.findAll({
      where: {
        userId: req.user.id,
      },
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, openOrders] = await to(
    Order.findAll({
      where: {
        userId: req.user.id,
        statusId: { [Op.eq]: 2 },
      },
      include: [
        { model: Trade, as: 'sellTrades' },
        { model: Trade, as: 'buyTrades' },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, orderHistory] = await to(
    Order.findAll({
      where: {
        userId: req.user.id,
        statusId: { [Op.ne]: 2 },
      },
      include: [
        { model: Trade, as: 'sellTrades' },
        { model: Trade, as: 'buyTrades' },
      ]
    }),
  );

  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, sellTrades] = await to(
    Trade.findAll({
      include: [
        {
          model: Order,
          as: 'sellOrder',
          where: { userId: req.user.id, sideId: 2, statusId: 1 },
        },
        Pair,
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, buyTrades] = await to(
    Trade.findAll({
      include: [
        {
          model: Order,
          as: 'buyOrder',
          where: { userId: req.user.id, sideId: 1, statusId: 1 },
        },
        Pair,
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  let withdrawTransactions;
  let depositTransactions;
  let withdrawUnconfirmedTransactions;
  let depositUnconfirmedTransactions;
  [err, withdrawTransactions] = await to(
    Transaction.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { model: Wallet, as: 'sourceWallet', where: { userId: req.user.id } },
        { model: Wallet, as: 'destinationWallet' },
      ],
    }),
  );
  [err, depositTransactions] = await to(
    Transaction.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Wallet,
          as: 'destinationWallet',
          where: { userId: req.user.id },
        },
        { model: Wallet, as: 'sourceWallet' },
      ],
    }),
  );

  // console.log(transactions[0].sourceWallet);

  [err, withdrawUnconfirmedTransactions] = await to(
    UnconfirmedTransaction.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { model: Wallet, as: 'sourceWallet', where: { userId: req.user.id } },
        { model: Wallet, as: 'destinationWallet' },
      ],
    }),
  );

  [err, depositUnconfirmedTransactions] = await to(
    UnconfirmedTransaction.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Wallet,
          as: 'destinationWallet',
          where: { userId: req.user.id },
        },
        { model: Wallet, as: 'sourceWallet' },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, favouritePairs] = await to(
    FavouritePairs.findAll({
      attributes: ['pairId'],
      include: [{ model: User, where: { id: req.user.id }, attributes: [] }],
    }),
  );

  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, favouriteCharts] = await to(
    FavouriteCharts.findAll({
      attributes: ['pairId'],
      include: [{ model: User, where: { id: req.user.id }, attributes: [] }],
    }),
  );

  if (err) {
    resError(res, 500, titles.FETCH_STATE_ERROR, errors.DATABASE_ERROR);
    return;
  }

  let userProfile;
  let newUserProfile = {};
  [err, userProfile] = await to(
    UserProfile.findOne({
      attributes: [
        'timezoneId',
        'baseCurrencyId',
        'countryId',
        'picture',
        'referralToken',
        'firstName',
        'lastName',
        'legalFirstName',
        'legalLastName',
        'legalMiddleName',
        'driverLicenseFrontPic',
        'driverLicenseBackPic',
        'identityCardFrontPic',
        'identityCardBackPic',
        'passportPic',
        'facePic',
        'kycToken',
        'verificationStatusId',
      ],
      where: {
        userId: req.user.id,
      },
      include: [
        { model: User, attributes: ['email'] },
        { model: UserVerificationStatus, attributes: ['id'] },
      ],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  if (userProfile) {
    newUserProfile.email = userProfile.User.email;
    newUserProfile.timezoneId = userProfile.timezoneId;
    newUserProfile.baseCurrencyId = userProfile.baseCurrencyId;
    newUserProfile.countryId = userProfile.countryId;
    newUserProfile.profilePicUrl = userProfile.picture;
    newUserProfile.referralToken = userProfile.referralToken;
    newUserProfile.firstName = userProfile.firstName;
    newUserProfile.lastName = userProfile.lastName;
    newUserProfile.legalFirstName = userProfile.legalFirstName;
    newUserProfile.legalLastName = userProfile.legalLastName;
    newUserProfile.legalMiddleName = userProfile.legalMiddleName;
    newUserProfile.driverLicenseFrontPic = userProfile.driverLicenseFrontPic;
    newUserProfile.driverLicenseBackPic = userProfile.driverLicenseBackPic;
    newUserProfile.identityCardFrontPic = userProfile.identityCardFrontPic;
    newUserProfile.identityCardBackPic = userProfile.identityCardBackPic;
    newUserProfile.passportPic = userProfile.passportPic;
    newUserProfile.facePic = userProfile.facePic;
    newUserProfile.kycToken = userProfile.kycToken;
    newUserProfile.verificationStatusId = userProfile.UserVerificationStatus.id;
  }

  [err, userAuthStatus] = await to(
    UserAuthStatus.findOne({
      attributes: [
        'smsEnabled',
        ['twoFactorAuthEnabled', 'twoFAEnabled'],
        'phoneNumber',
      ],
      where: {
        userId: req.user.id,
      },
      include: [{ model: User, attributes: [] }],
    }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, userLogins] = await to(
    UserLogin.count({ where: { userId: req.user.id } }),
  );

  if (err) {
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({
    isFirstLogin: userLogins === 1,
    userInfo: {
      wallets: wallets.map(item => {
        const lockedReward = rewards
          .filter(
            reward =>
              reward.tokenId === item.tokenId &&
              new Date(reward.end_date).getTime() > new Date().getTime(),
          )
          .map(_item => Number(_item.amount))
          .reduce(add, 0);

        return lockedReward ? { ...item.dataValues, lockedReward } : item;
      }),
      openOrders,
      orderHistory,
      tradeHistory: [
        ...sellTrades.map(trade => ({
          price: trade.price,
          orderId: trade.sellOrderId,
          amount: trade.amount,
          pair: trade.Pair.name,
          side: 'Sell',
          type: trade.sellOrder.typeId === 1 ? 'Market' : 'Limit',
          total: trade.price * trade.amount,
          timestamp: trade.createdAt,
          fee: 0,
          // fee: (trade.price * trade.amount * 16) / 1000,
        })),
        ...buyTrades.map(trade => ({
          price: trade.price,
          orderId: trade.buyOrderId,
          amount: trade.amount,
          pair: trade.Pair.name,
          side: 'Buy',
          type: trade.buyOrder.typeId === 1 ? 'Market' : 'Limit',
          total: trade.price * trade.amount,
          timestamp: trade.createdAt,
          fee: 0,
          // fee: (trade.price * trade.amount * 16) / 1000,
        })),
      ], // { sellTrades, buyTrades },
      transactionHistory: {
        withdraw: [...withdrawTransactions, ...withdrawUnconfirmedTransactions],
        deposit: [...depositTransactions, ...depositUnconfirmedTransactions],
      },
      profile: newUserProfile,
      authStatus: userAuthStatus,
      favouritePairs: favouritePairs.map(chart => chart.pairId),
      favouriteCharts: favouriteCharts.map(chart => chart.pairId),
    },
  });
});

export default app;
