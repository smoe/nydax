import config from './config';

export const resError = (res, statusCode, messageTitle, messageDescription) => {
  console.log('error', { // eslint-disable-line
    title: messageTitle,
    description: messageDescription,
  });

  res.status(statusCode).json({
    error: { title: messageTitle, description: messageDescription },
  });
};

export const resSuccess = (
  res,
  statusCode,
  messageTitle,
  messageDescription,
) => {
  console.log('success', { // eslint-disable-line
    title: messageTitle,
    description: messageDescription,
  });
  res.status(statusCode).json({
    message: { title: messageTitle, description: messageDescription },
  });
};

export const getTokenNodeUrl = tokenId => {
  let url = '';
  switch (tokenId) {
    case 1:
    case 3:
    case 4:
      url = config.ethereumNodeAPI;
      break;
    case 2:
      url = config.bitcoinNodeAPI;
      break;

    default:
      break;
  }

  return url;
};

export const getTokenNodeUrlByTokenType = tokenType => {
  let url = '';
  switch (tokenType) {
    case 'ERC-20':
      url = config.ethereumNodeAPI;
      break;

    case 'BTC':
      url = config.bitcoinNodeAPI;
      break;
    default:
      break;
  }

  return url;
};

export const calculateChange24Percentage = pair => {
  const output = (
    (pair.change24Price / (pair.lastPrice - pair.change24Price)) *
    100
  ).toFixed(2);
  return isNaN(output) ? Number(0).toFixed(2) : output; // eslint-disable-line
};
