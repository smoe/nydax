import express from 'express';
import to from 'await-to-js';
import axios from 'axios';
import sanitize from '../sanitization';
import { validateTransaction } from '../validation';
import { resError, resSuccess, getTokenNodeUrl } from '../utils';
import { UnconfirmedTransaction, Wallet, Token } from '../models'; // Pair
import getTransactions from '../controllers/user/getTransactions';
import { errors, successes, titles } from '../constants/messages';
/* eslint-disable prefer-const */

const app = express();

app.get('/', getTransactions);

app.post('/', async (req, res) => {
  // Input sanitization
  const sanitizedTransaction = sanitize(req.body.transaction);

  let transaction;
  let token;
  let err;
  let sourceWallet;
  let destinationWallet;
  let newDestinationWalletExternal;
  let response;
  // let transactionPairWithUsdQuote;
  try {
    transaction = JSON.parse(sanitizedTransaction);
  } catch (error) {
    transaction = {};
  }

  [err, token] = await to(
    Token.findOne({ where: { id: transaction.tokenId } }),
  );

  if (err) {
    resError(res, 500, titles.WITHDRAW_ERROR, errors.DATABASE_ERROR);
  }

  // Input validation
  const validationError = validateTransaction(transaction, token);
  if (validationError.length > 0) {
    resError(res, 500, titles.WITHDRAW_ERROR, validationError);
    return;
  }

  // TODO: handle withdrawal fee

  // TODO: check if sourceWallet and destinationWallet are not the same

  [err, sourceWallet] = await to(
    Wallet.findOne({
      where: { id: transaction.walletId },
    }),
  );

  if (err || !sourceWallet) {
    resError(res, 500, titles.WITHDRAW_ERROR, errors.DATABASE_ERROR);
    return;
  }

  [err, destinationWallet] = await to(
    Wallet.findOne({
      where: {
        address: transaction.destination,
        tokenId: sourceWallet.tokenId,
      },
    }),
  );

  if (!destinationWallet) {
    [err, newDestinationWalletExternal] = await to(
      Wallet.create({
        // userId: sourceWallet.userId,
        tokenId: sourceWallet.tokenId,
        address: transaction.destination,
        isExternal: true,
      }),
    );
  }

  if (err) {
    resError(res, 500, titles.WITHDRAW_ERROR, errors.DATABASE_ERROR);
    return;
  }

  // TODO: check destination is valid. It seems it has not a well-known solution

  if (sourceWallet.balance < transaction.amount) {
    resError(res, 500, titles.WITHDRAW_ERROR, errors.WALLET_BALANCE_NOT_ENOUGH);
    return;
  }

  [err, response] = await to(
    axios({
      data: {
        from: sourceWallet.address,
        to: transaction.destination,
        amount: transaction.amount,
      },
      method: 'post',
      url: `${getTokenNodeUrl(transaction.tokenId)}/api/transfer/${
        transaction.tokenId
      }`,
    }),
  );

  if (err) {
    if (newDestinationWalletExternal) {
      [err] = await to(newDestinationWalletExternal.destroy());
    }
    resError(res, 500, titles.WITHDRAW_ERROR, errors.TRANSFER_ERROR);
    return;
  }

  if (response.data.hash) {
    sourceWallet.balance -= transaction.amount + Number(token.withdrawalFee);
    [err] = await to(sourceWallet.save());

    if (err) {
      resError(res, 500, titles.WITHDRAW_ERROR, errors.DATABASE_ERROR);
      return;
    }

    // [err, transactionPairWithUsdQuote] = await to(
    //   Pair.findOne({
    //     where: {
    //       baseTokenId: transaction.tokenId,
    //       quoteTokenId: 3, // TODO: don't hard code usd token id
    //     },
    //   }),
    // );

    [err] = await to(
      UnconfirmedTransaction.create({
        txHash: response.data.hash,
        // typeId: 1,
        tokenId: transaction.tokenId,
        sourceId: sourceWallet.id,
        destinationId: destinationWallet
          ? destinationWallet.id
          : newDestinationWalletExternal.id,
        amount: transaction.amount,
        // usdPriceAtTransactionTime: transactionPairWithUsdQuote.lastPrice,
        // userId: req.user.id,
        // walletId: wallet.id,
        statusId: 3, // pending
      }),
    );

    if (err) {
      resError(res, 500, titles.WITHDRAW_ERROR, errors.DATABASE_ERROR);
      return;
    }

    resSuccess(
      res,
      200,
      titles.TRANSACTION_REGISTERATION,
      transaction.typeId === 1
        ? successes.WITHDRAW_REGISTERED(token.symbol, transaction.amount)
        : successes.DEPOSIT_DONE,
    );
  }
});

// Blockchain based routes

// this is for withdraw purpose
// app.post('/Transfer', (req, res) => {
//   // let { blockchain, from, to, amount } = req.body;
//   // return 200 on success and 500 on error
// });

// // this is for getting balance updates of deposited wallets
// app.post('/getBalance', (req, res) => {
//   // let { blockchain, walletAddress } = req.body;
//   // return balance on success and 500 on error
// });

// app.post('/getAccount', (req, res) => {
//   // let { blockchain } = req.body;
//   // return { privateKey, publicKey, address } on success and 500 on error
// });

export default app;
