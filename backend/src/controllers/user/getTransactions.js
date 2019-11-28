import to from 'await-to-js';
import { Transaction, UnconfirmedTransaction, Wallet } from '../../models';
import { errors, titles } from '../../constants/messages';
import { resError } from '../../utils';
/* eslint-disable prefer-const */

// TODO: just return helpful attributes and consider security for selecting attributes.

const getTransactions = async (req, res) => {
  let err;
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
    resError(res, 500, titles.USER_INFO_ERROR, errors.DATABASE_ERROR);
    return;
  }

  res.status(200).json({
    withdraw: [...withdrawTransactions, ...withdrawUnconfirmedTransactions],
    deposit: [...depositTransactions, ...depositUnconfirmedTransactions],
  });
};

export default getTransactions;
