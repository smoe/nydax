import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import config from './config';
import { errors } from './constants/messages';

/* eslint-disable import/prefer-default-export */

export const jwtVerify = credentialsRequired =>
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired,
    getToken: req => req.get('authorization'),
  });

export const jwtErrorHandle = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    // console.error('[express-jwt-error]', req.get('authorization'));
    // `clear token`, otherwise user can't use web-app
    res.status(200).json({ error: errors.TOKEN_IS_NOT_VALID });
  }
  next(err);
};
