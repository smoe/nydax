/* eslint-disable max-len */

module.exports = {
  //host: process.env.FED_HOST || 'http://localhost:3000',
  host: process.env.FED_HOST || 'https://ixp.nydax.com',
  // FIXME: get hostName from constants/hostNames.js
  platformName: process.env.PLATFORM_NAME || 'NYDAX',

  // Node.js app
  portHTTP: process.env.HTTP_PORT || 3000,
  portHTTPS: process.env.HTTPS_PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // API Gateway
  api: {
    serverPort: process.env.BED_PORT || 3004,
    serverUrl:
      process.env.API_GATEWAY_HOST ||
      //`http://localhost:${process.env.BED_PORT || 3004}`,
      `http://ixp.nydax.com:2083`,

    websocketUrl:
      process.env.WEBSOCKET_HOST ||
      //`http://localhost:${process.env.WEBSOCKET_PORT || 3003}`,
      `http://ixp.nydax.com:2053`,
  },

  // environment
  environment: process.env.ENVIRONMENT || 'production',

  // Umbrella API key
  apiKey: 'UWuOY60KyGD2YUFJPzgJoTonHk0CdqbBuG5Mjs',
  apiKeyHeader: 'X-Api-Key',

  // ssl credentials
  sslPrivateKeyPath:
    process.env.SSL_PRIVATE_KEY_PATH || '/etc/ssl/private/nydax.com.pem',
  sslCertificatePath:
    process.env.SSL_CERTIFICATE_PATH || '/etc/ssl/certs/nydax.com.crt',

  // google recaptcha configs
  recaptcha: {
    siteKey: '6LfxfooUAAAAAB6dDWPvtVV6Y3nMBWr_WDaGd',
  },

  // JWT token expiry time
  authTokenExpiryTime: 15 * 60,

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID || 'UA-1405864-1', // UA-XXXXX-X
  },
};
