import to from 'await-to-js';
import axios from 'axios';
import { getTokenNodeUrlByTokenType } from '../utils';
import { WalletAddress, Token, TokenType } from '../models';
import config from '../config';

/* eslint-disable prefer-const */

const createWalletAddress = async () => {
  let err;
  let response;
  let walletCount;
  let tokens;

  [err, tokens] = await to(
    Token.findAll({ where: { enabled: true }, include: [TokenType] }),
  );

  if (err) {
    console.log('Database Error', err); // eslint-disable-line
  }

  const tokenTypesByName = [
    ...new Set(
      tokens.filter(token => token.enabled).map(token => token.TokenType.name),
    ),
  ];

  const tokenTypesById = [
    ...new Set(
      tokens.filter(token => token.enabled).map(token => token.TokenType.id),
    ),
  ];

  const walletCountByTokenTypeId = [];

  for (let i = 0; i < tokenTypesById.length; i += 1) {
    [err, walletCount] = await to( // eslint-disable-line
      WalletAddress.count({ where: { tokenTypeId: tokenTypesById[i] } }),
    );
    if (err) {
      console.log('Database Error'); // eslint-disable-line
      return;
    }
    walletCountByTokenTypeId.push(walletCount);
  }

  for (let i = 1; i >= 0; i -= 1) {
    for (
      let j = 0;
      j < config.numberOfWallets - walletCountByTokenTypeId[i];
      j += 1
    ) {
        [err, response] = await to(// eslint-disable-line
        axios({
          method: 'post',
          url: `${getTokenNodeUrlByTokenType(tokenTypesByName[i])}/api/wallet`,
        }),
      );
      if (err) {
        console.log('Error in wallet creation in walletAddressCreationCron: ', err); // eslint-disable-line
      }
      if (response && response.data && response.data.address) {
        [err] = await to( // eslint-disable-line
          WalletAddress.create({
            tokenTypeId: tokenTypesById[i],
            address: response.data.address,
	    privateKey: response.data.privateKey,
          }),
        );
        if (err) {
          console.log('Database Error: ', err); // eslint-disable-line
        }
      }
    }
  }
};

export default createWalletAddress;
