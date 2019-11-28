import to from 'await-to-js';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import keythereum from 'keythereum';
import config from '../../config';
import sanitize from '../../sanitization';
import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateToken,
} from '../../validation';
// import initializeWallets from '../wallet/initializeWallets';
import { resError } from '../../utils';
import sendConfirmationEmail from './sendConfirmationEmail';
import {
  User,
  UserAuthStatus,
  UserProfile,
  Wallet,
  FavouriteCharts,
  Token,
  TokenType,
  Transaction,
  WalletAddress,
} from '../../models';
import { errors, titles } from '../../constants/messages';

const register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    referralToken,
    captchaValue,
  } = req.body;

  // validate captcha value
  if (config.environment === 'production') {
    const [recaptchaErr, recaptchaValidationResponse] = await to(
      axios({
        method: 'post',
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${
          config.recaptcha.secretKey
        }&response=${captchaValue}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      }),
    );
    if (recaptchaErr || recaptchaValidationResponse.data.success === false) {
      resError(
        res,
        500,
        titles.REGISTRATION_ERROR,
        errors.RECAPTCHA_VALIDATION_ERROR,
      );
      return;
    }
  }

  // input validation
  if (!email) {
    resError(res, 500, titles.REGISTRATION_ERROR, errors.EMAIL_IS_NOT_PROVIDED);
    return;
  }

  if (!password) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.PASSWORD_IS_NOT_PROVIDED,
    );
    return;
  }

  if (!firstName) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.FIRST_NAME_IS_NOT_PROVIDED,
    );
    return;
  }

  if (!lastName) {
    resError(
      res,
      500,
      titles.REGISTRATION_ERROR,
      errors.LAST_NAME_IS_NOT_PROVIDED,
    );
    return;
  }

  const emailValidationError = validateEmail(email);
  const passwordValidationError = validatePassword(password, true);
  const firstNameValidationError = validateFirstName(firstName);
  const lastNameValidationError = validateLastName(lastName);
  if (emailValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, emailValidationError);
    return;
  }
  if (passwordValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, passwordValidationError);
    return;
  }
  if (firstNameValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, firstNameValidationError);
    return;
  }
  if (lastNameValidationError.length > 0) {
    resError(res, 500, titles.REGISTRATION_ERROR, lastNameValidationError);
    return;
  }
  if (referralToken) {
    const referralTokenValidationError = validateToken(referralToken);
    if (referralTokenValidationError.length > 0) {
      resError(
        res,
        500,
        titles.REGISTRATION_ERROR,
        referralTokenValidationError,
      );
      return;
    }
  }

  // input sanitization
  const emailSanitized = sanitize(email);
  const passwordSanitized = sanitize(password);
  const firstNameSanitized = sanitize(firstName);
  const lastNameSanitized = sanitize(lastName);
  const referralTokenSanitized = sanitize(referralToken);

  let err;
  let user;
  let newUser;
  let referredUser;
  let walletAddress;

  // if the user is not already logged in
  if (!req.user) {
    [err, user] = await to(User.findOne({ where: { email: emailSanitized } }));
    if (err) {
      resError(res, 500, titles.REGISTRATION_ERROR, errors.DATABASE_ERROR);
      return;
    }

    // user already exists
    if (user) {
      if (user.emailConfirmed === true) {
        resError(
          res,
          500,
          titles.REGISTRATION_ERROR,
          errors.EMAIL_IS_REGISTERED_BEFORE,
        );
        return;
      }
      [err] = await to(user.destroy());
      if (err) {
        resError(res, 500, titles.REGISTRATION_ERROR, errors.DATABASE_ERROR);
        return;
      }
    }

    if (config.giveReferralReward && referralTokenSanitized.length > 0) {
      [err, referredUser] = await to(
        User.findOne({
          include: [
            {
              model: UserProfile,
              where: { referralToken: referralTokenSanitized },
            },
          ],
        }),
      );

      if (err) {
        resError(res, 500, titles.REGISTRATION_ERROR, errors.DATABASE_ERROR);
        return;
      }
    }

    // create initial user object
    const dbUser = {
      email: emailSanitized,
      password: User.generateHash(passwordSanitized),
      UserProfile: {
        firstName: firstNameSanitized,
        lastName: lastNameSanitized,
        baseCurrencyId: 1,
        timezoneId: 1,
      },
      UserAuthStatus: {
        twoFactorAuthEnabled: false,
        smsEnabled: false,
      },
      referredBy:
        referredUser && referredUser.UserProfile.verificationStatusId === 4
          ? referredUser.id
          : null,
    };

    // create new user with dbUser object
    [err, newUser] = await to(
      User.create(dbUser, {
        include: [UserProfile, UserAuthStatus],
      }),
    );

    if (err) {
      resError(res, 500, titles.REGISTRATION_ERROR, errors.DATABASE_ERROR);
      return;
    }

    // initialize wallets for new registered users
    let tokens;
    [err, tokens] = await to(Token.findAll({ include: [TokenType] })); // eslint-disable-line prefer-const

    if (err) {
      resError(res, 500, titles.REGISTRATION_ERROR, errors.DATABASE_ERROR);
      return;
    }

    const tokenTypes = [
      ...new Set(
        tokens
          .filter(token => token.enabled)
          .map(token => token.TokenType.name),
      ),
    ];

    const tokenTypesById = [
      ...new Set(
        tokens.filter(token => token.enabled).map(token => token.TokenType.id),
      ),
    ];

    // await to(
    //   Wallet.create(
    //     {
    //       userId,
    //       tokenId: 2,
    //       privateKey: 'pk',
    //       publicKey: 'puk',
    //       address: `0x${crypto.randomBytes(20).toString('hex')}`,
    //       balance: 10000,
    //     },
    //     {
    //       fields: Object.keys({
    //         userId,
    //         tokenId: 2,
    //         privateKey: 'pk',
    //         publicKey: 'puk',
    //         address: `0x${crypto.randomBytes(20).toString('hex')}`,
    //         balance: 10000,
    //       }),
    //       include: [User, Token],
    //     },
    //   ),
    // );

    for (let i = 0; i < tokenTypes.length; i += 1) {
      // let balance = 100;
      // switch (tokens[i].name) {
      //   case 'invo':
      //     balance = 625;
      //     break;
      //   case 'tether':
      //     balance = 10000;
      //     break;
      //   case 'bitcoin':
      //     balance = 10;
      //     break;
      //   case 'ethereum':
      //     balance = 100;
      //     break;
      //   case 'AiChatDoc':
      //     balance = 625;
      //     break;
      //   case 'AiTrader':
      //     balance = 625;
      //     break;
      //   default:
      //     break;
      // }
      // const wallet = {
      //   userId,
      //   tokenId: tokens[i].id,
      //   privateKey: 'pk',
      //   publicKey: 'puk',
      //   address: `0x${crypto.randomBytes(20).toString('hex')}`,
      //   balance,
      // };

      if (tokenTypes[i] !== 'OTHER') {
        // [err, response] = await to(// eslint-disable-line
        //   axios({
        //     method: 'post',
        //     url: `${getTokenNodeUrlByTokenType(tokenTypes[i])}/api/wallet`,
        //   }),
        // );

        // if (err) {
        //   resError(res, 500, titles.SERVER_ERROR, titles.REGISTRATION_ERROR);
        //   [err] = await to(newUser.destroy()); // eslint-disable-line
        //   if (err) {
        //     resError(
        //       res,
        //       500,
        //       titles.REGISTRATION_ERROR,
        //       errors.DATABASE_ERROR,
        //     );
        //   }
        //   return;
        // }

        [err, walletAddress] = await to( // eslint-disable-line
          WalletAddress.findOne({ where: { tokenTypeId: tokenTypesById[i] } }),
        );

        if (err) {
          resError(res, 500, titles.REGISTRATION_ERROR, errors.DATABASE_ERROR);
          return;
        }

        if (walletAddress && walletAddress.address) {
          for (let j = 0; j < tokens.length; j += 1) {
            if (
              tokens[j].TokenType.name === tokenTypes[i] &&
              tokens[j].enabled
            ) {
		    console.log(walletAddress, 'asdasdas');
              const wallet = {
                userId: newUser.id,
                tokenId: tokens[j].id,
		privateKey: walletAddress.privateKey,
                publicKey: '',
                address: walletAddress.address,
                balance:
                  config.giveReward && tokens[j].id === 3 // invo
                    ? config.rewardInvoCount
                    : 0, // tokens[j].id === 1 ? 625 : 0,
              };

              [err] = await to(// eslint-disable-line
                Wallet.create(wallet, {
                  fields: Object.keys(wallet),
                  include: [User, Token],
                }),
              );

              if (err) {
                [err] = await to(newUser.destroy()); // eslint-disable-line
                resError(
                  res,
                  500,
                  titles.REGISTRATION_ERROR,
                  errors.DATABASE_ERROR,
                );
                return;
              }

              [err] = await to(walletAddress.destroy()); // eslint-disable-line

              if (err) {
                [err] = await to(newUser.destroy()); // eslint-disable-line
              }

              if (config.giveReward && tokens[j].id === 3) {
                [err] = await to(// eslint-disable-line
                  Transaction.create({
                    txHash: uuidv4(),
                    tokenId: wallet.tokenId,
                    destinationId: wallet.id,
                    amount: config.rewardInvoCount,
                    isBankPayment: false,
                    statusId: 6, // completed
                  }),
                );
              }
            }
          }
        } else {
          resError(res, 500, titles.SERVER_ERROR, titles.REGISTRATION_ERROR);
          [err] = await to(newUser.destroy()); // eslint-disable-line
          if (err) {
            resError(
              res,
              500,
              titles.REGISTRATION_ERROR,
              errors.DATABASE_ERROR,
            );
          }
          return;
        }
      } else {
        for (let j = 0; j < tokens.length; j += 1) {
          if (tokens[j].TokenType.name === tokenTypes[i] && tokens[j].enabled) {
            const params = { keyBytes: 32, ivBytes: 16 };
            const dk = keythereum.create(params);
            const keyDump = keythereum.dump(
              'password123',
              dk.privateKey,
              dk.salt,
              dk.iv,
            );
            const { address } = keyDump;
            const wallet = {
              userId: newUser.id,
              tokenId: tokens[j].id,
              publicKey: '',
              address,
              balance: 0, // tokens[j].id === 1 ? 625 : 0,
            };

            [err] = await to(// eslint-disable-line
              Wallet.create(wallet, {
                fields: Object.keys(wallet),
                include: [User, Token],
              }),
            );

            if (err) {
              [err] = await to(newUser.destroy()); // eslint-disable-line
              resError(
                res,
                500,
                titles.REGISTRATION_ERROR,
                errors.DATABASE_ERROR,
              );
              return;
            }
          }
        }
      }
    }
    // end of wallet initialization

    // send confirmation email to new user
    sendConfirmationEmail(req, res);

    // Add initial favourite charts for new user
    [err] = await to(FavouriteCharts.create({ userId: newUser.id, pairId: 1 }));
    // No error handling. It's not a big dead if user hasn't any favourite charts!

    res.status(200).json({});
    return;
  }
  // user is signed in before
  resError(res, 500, titles.REGISTRATION_ERROR, errors.USER_ALREADY_SIGNED_IN);
};

export default register;
