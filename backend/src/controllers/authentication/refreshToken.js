/* eslint-disable no-param-reassign */
import jwt from 'jsonwebtoken';
import config from '../../config';
import { resError } from '../../utils';
import { validateToken } from '../../validation';
import sanitize from '../../sanitization';
import { errors, titles } from '../../constants/messages';

const refreshToken = (req, res) => {
  const { authToken } = req.body;

  // Input validation
  if (!authToken) {
    resError(res, 500, titles.AUTHENTICATION, errors.AUTH_TOKEN_NOT_PROVIDED);
    return;
  }

  const tokenValidationError = validateToken(authToken);
  if (tokenValidationError.length > 0) {
    resError(res, 500, titles.AUTHENTICATION, tokenValidationError);
    return;
  }

  // input sanitization
  const sanitizedAuthToken = sanitize(authToken);

  jwt.verify(sanitizedAuthToken, config.auth.jwt.secret, (err, decoded) => {
    if (!decoded) {
      resError(res, 401, titles.AUTHENTICATION, errors.TOKEN_IS_NOT_VALID);
    } else {
      // refresh auth token
      const expirationTime = config.auth.jwt.expiration;
      const token = jwt.sign({ id: decoded.id }, config.auth.jwt.secret, {
        expiresIn: expirationTime,
      });
      res.status(200).json({ token });
    }
  });
};

export default refreshToken;
