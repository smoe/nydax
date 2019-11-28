/* eslint-disable max-len */

module.exports = {
  // Node.js app
  port: process.env.BED_PORT || 3004,
  host: process.env.BED_HOST || 'http://localhost:3004',
  gatewayHost:
    process.env.API_GATEWAY_HOST ||
    `http://localhost:${process.env.BED_PORT || 3004}`,
  websocketPort: process.env.WEBSOCKET_PORT || 2053,

  frontEndServer: process.env.FED_HOST || 'http://localhost:3000',

  ethereumNodeAPI: process.env.ETH_HOST || 'http://localhost:4040',
  bitcoinNodeAPI: process.env.BTC_HOST || 'http://localhost:5050',

  platformName: process.env.PLATFORM_NAME || 'NYDAX',

  // https://expressjs.com/en/guide/behind-proxies.html
  // trustProxy: process.env.TRUST_PROXY || 'loopback',

  // Database
  databaseUrl:
    process.env.DATABASE_URL ||
    `mysql://${process.env.DB_USER || 'root'}:${process.env.DB_PASS ||
      ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT ||
      '3306'}/${process.env.DB_NAME || 'ixp'}`,

  initializeDB: false,
  alterDB: false, // eslint-disable-line
  sequelizeLogging: false,
  initializePriceTables: false,
  initializeBotUsers: false,

  giveReward: false,
  rewardInvoCount: 0,
  usdEquivalentOfReward: 25,
  usdEquivalentOfRewardForRefferedUser: 25,
  giveReferralReward: true,
  maxNumberOfReferralReward: 20,
  rewardLockEndDate: '2019-09-01 00:00:00',

  // upload image size limit
  imageMaxSize: 1024 * 1024 * 20,

  // time that user stays in blacklist
  blacklistTime: 60 * 60,
  // number of failed attempts before getting blacklisted
  maxFailedAttempt: 3,
  // number of wallets in WalletAddress model for each token
  numberOfWallets: 100,

  // environment
  environment: process.env.ENVIRONMENT || 'development',

  // ssl credentials
  sslPrivateKeyPath:
    process.env.SSL_PRIVATE_KEY_PATH || '/etc/ssl/private/nydax.com.pem',
  sslCertificatePath:
    process.env.SSL_CERTIFICATE_PATH || '/etc/ssl/certs/nydax.com.crt',

  // Email service
  nodemailer: {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },

  // SMS service
  twilioService: {
    authToken: process.env.AUTH_TOKEN,
    accountSID: process.env.ACCOUNT_SID,
    phoneNumber: process.env.PHONE_NUMBER,
  },

  // Authentication
  auth: {
    jwt: {
      secret: 'Nydax secret',
      expiration: 15 * 60,
    },
  },

  // google recaptcha configs
  recaptcha: {
    secretKey: process.env.RE_CAPTCHA,
  },

  // Payment api keys
  paymentApiKeys: {
    stripe: {
      apiKey: process.env.STRIPE_API_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  },
};
