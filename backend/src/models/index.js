import sequelize from '../sequelize';
import User, { initialize as initializeUser } from './User/User';
import Blacklist, { initialize as initializeBlackList } from './Blacklist';
import FailedLoginAttempt from './FailedLoginAttempt';
import UserLogin from './User/UserLogin';
import UserAuthStatus, {
  initialize as initializeUserAuthStatus,
} from './User/UserAuthStatus';
import UserProfile, {
  initialize as initializeUserProfile,
} from './User/UserProfile';
import UserVerificationStatus, {
  initialize as initializeVerificationStatus,
} from './User/UserVerificationStatus';
import UserVerificationFeedback from './User/UserVerificationFeedback';
import UserAccountActivity from './User/UserAccountActivity';
import Country, { initialize as initializeCountry } from './Country';
import Currency, { initialize as initializeCurrency } from './Currency';
import Timezone, { initialize as initializeTimezone } from './Timezone';
import Token, { initialize as initializeToken } from './Token/Token';
import TokenType, {
  initialize as initializeTokenType,
} from './Token/TokenType';
import TokenCategory, {
  initialize as initializeTokenCategory,
} from './Token/TokenCategory';
import Setting, { initialize as initializeSetting } from './Setting/Setting';
import SettingType, {
  initialize as initializeSettingType,
} from './Setting/SettingType';
import Pair, { initialize as initializePair } from './Pair';
import OrderSide, {
  initialize as initializeOrderSide,
} from './Order/OrderSide';
import OrderType, {
  initialize as initializeOrderType,
} from './Order/OrderType';
import OrderStatus, {
  initialize as initializeOrderStatus,
} from './Order/OrderStatus';
import Order from './Order/Order';
import OrderFillType, {
  initialize as initializeOrderFillType,
} from './Order/OrderFillType';
import Wallet, { initialize as initializeWallet } from './Wallet';
import Trade from './Trade';
import Transaction from './Transaction/Transaction';
import UnconfirmedTransaction from './Transaction/UnconfirmedTransaction';
import TransactionStatus, {
  initialize as initializeTransactionStatus,
} from './Transaction/TransactionStatus';
import PriceTick from './Price/PriceTick';
import PriceMinute from './Price/PriceMinute';
import PriceDay from './Price/PriceDay';
import FavouritePairs from './FavouritePairs';
import FavouriteCharts from './FavouriteCharts';
import Invitation, { initialize as initializeInvitation } from './Invitation';
import initializePriceDBs from './Price/initializePrices';
import config from '../config';
import BankPayment from './Bank/BankPayment';
import BankPaymentStatus, {
  initialize as initializeBankPaymentStatus,
} from './Bank/BankPaymentStatus';
import BankService, {
  initialize as initializeBankService,
} from './Bank/BankService';
import TradeFee, { initialize as initializeTradeFee } from './TradeFee';
import Reward from './Reward';
import WalletAddress from './WalletAddress';

Token.belongsTo(TokenType, {
  foreignKey: 'typeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Token.belongsTo(TokenCategory, {
  foreignKey: 'categoryId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

BankPayment.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

BankPayment.belongsTo(Token, {
  foreignKey: 'tokenId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

BankPayment.belongsTo(Currency, {
  foreignKey: 'currencyId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

BankPayment.belongsTo(BankPaymentStatus, {
  foreignKey: 'bankPaymentStatusId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

BankPayment.belongsTo(BankService, {
  foreignKey: 'bankServiceId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Setting.belongsTo(SettingType, {
  foreignKey: 'settingTypeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Pair.belongsTo(Token, {
  foreignKey: 'baseTokenId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Pair.belongsTo(Token, {
  foreignKey: 'quoteTokenId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Order.belongsTo(OrderSide, {
  foreignKey: 'sideId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Order.belongsTo(OrderStatus, {
  foreignKey: 'statusId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Order.belongsTo(OrderType, {
  foreignKey: 'typeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Order.belongsTo(OrderFillType, {
  foreignKey: 'fillTypeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Order.belongsTo(Pair, {
  foreignKey: 'pairId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Order.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Order.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

PriceTick.belongsTo(Pair, {
  foreignKey: 'pairId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
PriceMinute.belongsTo(Pair, {
  foreignKey: 'pairId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
PriceDay.belongsTo(Pair, {
  foreignKey: 'pairId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

UserProfile.belongsTo(Country, {
  foreignKey: 'countryId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
UserProfile.belongsTo(Currency, {
  foreignKey: 'baseCurrencyId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
UserProfile.belongsTo(Timezone, {
  foreignKey: 'timezoneId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
UserProfile.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
UserProfile.belongsTo(UserVerificationStatus, {
  foreignKey: 'verificationStatusId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
UserProfile.hasMany(UserVerificationFeedback, {
  foreignKey: 'userProfileId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
User.hasOne(UserProfile, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserAccountActivity, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
User.hasMany(Order, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.hasOne(UserAuthStatus, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
UserAuthStatus.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Trade.belongsTo(Order, {
  foreignKey: 'sellOrderId',
  as: 'sellOrder',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Trade.belongsTo(Order, {
  foreignKey: 'buyOrderId',
  as: 'buyOrder',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Trade.belongsTo(Pair, {
  foreignKey: 'pairId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Order.hasMany(Trade, {
  foreignKey: 'sellOrderId',
  as: 'sellTrades',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Order.hasMany(Trade, {
  foreignKey: 'buyOrderId',
  as: 'buyTrades',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Wallet.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
User.hasMany(Wallet, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
Wallet.belongsTo(Token, {
  foreignKey: 'tokenId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(FailedLoginAttempt, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Transaction.belongsTo(Wallet, {
//   foreignKey: 'walletId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
// Transaction.belongsTo(TransactionType, {
//   foreignKey: 'typeId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
Transaction.belongsTo(Wallet, {
  foreignKey: 'sourceId',
  as: 'sourceWallet',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
Transaction.belongsTo(Wallet, {
  foreignKey: 'destinationId',
  as: 'destinationWallet',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
// Transaction.belongsTo(User, {
//   foreignKey: 'userId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
Transaction.belongsTo(TransactionStatus, {
  foreignKey: 'statusId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// UnconfirmedTransaction.belongsTo(Wallet, {
//   foreignKey: 'walletId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
// UnconfirmedTransaction.belongsTo(TransactionType, {
//   foreignKey: 'typeId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
UnconfirmedTransaction.belongsTo(Wallet, {
  foreignKey: 'sourceId',
  as: 'sourceWallet',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
UnconfirmedTransaction.belongsTo(Wallet, {
  foreignKey: 'destinationId',
  as: 'destinationWallet',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
// UnconfirmedTransaction.belongsTo(User, {
//   foreignKey: 'userId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });
UnconfirmedTransaction.belongsTo(TransactionStatus, {
  foreignKey: 'statusId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

FavouritePairs.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
FavouritePairs.belongsTo(Pair, {
  foreignKey: 'pairId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

FavouriteCharts.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});
FavouriteCharts.belongsTo(Pair, {
  foreignKey: 'pairId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Invitation.belongsTo(User, {
  foreignKey: 'invitedBy',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

TradeFee.belongsTo(Pair, {
  foreignKey: 'pairId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Reward.belongsTo(User, {
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

Reward.belongsTo(Token, {
  foreignKey: 'tokenId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});

WalletAddress.belongsTo(TokenType, {
  foreignKey: 'tokenTypeId',
  onUpdate: 'cascade',
  onDelete: 'set null',
});
const initializeDatabase = async () => {
  if (config.initializeDB) {
    await initializeCountry();
    await initializeCurrency();
    await initializeTimezone();
    await initializeTokenType();
    await initializeTokenCategory();
    await initializeToken();
    await initializeSettingType();
    await initializeSetting();
    await initializeOrderSide();
    await initializeOrderType();
    await initializeOrderStatus();
    await initializeOrderFillType();
    await initializeTransactionStatus();
    await initializeVerificationStatus();
    await initializeUser();
    await initializeBlackList();
    await initializeUserProfile();
    await initializeUserAuthStatus();
    await initializePair();
    await initializeTradeFee();
    if (config.initializeWallets) await initializeWallet();
    await initializeInvitation();
    await initializeBankService();
    await initializeBankPaymentStatus();
  }

  if (config.initializePriceTables) {
    // TODO: first clear minute and day prices.
    initializePriceDBs();
  }
};

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export {
  User,
  UserLogin,
  UserAuthStatus,
  UserProfile,
  UserAccountActivity,
  UserVerificationStatus,
  UserVerificationFeedback,
  Country,
  Currency,
  Timezone,
  TokenType,
  TokenCategory,
  Token,
  SettingType,
  Setting,
  Pair,
  OrderSide,
  OrderType,
  OrderStatus,
  Order,
  OrderFillType,
  Wallet,
  Trade,
  UnconfirmedTransaction,
  Transaction,
  TransactionStatus,
  PriceTick,
  PriceMinute,
  PriceDay,
  FavouritePairs,
  FavouriteCharts,
  Invitation,
  TradeFee,
  Reward,
  WalletAddress,
  initializeDatabase,
  Blacklist,
};
