import express from 'express';
import login from '../controllers/authentication/login';
import register from '../controllers/authentication/register';
import confirmEmail from '../controllers/authentication/confirmEmail';
import resetPasswordEmail from '../controllers/authentication/resetPasswordEmail';
import resetPassword from '../controllers/authentication/resetPassword';
import smsToken from '../controllers/authentication/smsToken';
import smsTokenVerify from '../controllers/authentication/smsTokenVerify';
import getGoogleAuthenticator from '../controllers/authentication/getGoogleAuthenticator';
import validateAuthenticatorSecret from '../controllers/authentication/validateAuthenticatorSecret';
import disableGoogleAuthenticator from '../controllers/authentication/disableGoogleAuthenticator';
import sendConfirmationEmail from '../controllers/authentication/sendConfirmationEmail';
import refreshToken from '../controllers/authentication/refreshToken';

const app = express();

app.post('/login', login);
app.post('/register', register);
app.get('/verifyEmail/:token', confirmEmail);
app.post('/resetPasswordEmail', resetPasswordEmail);
app.post('/resetPassword', resetPassword);
app.post('/sendConfirmationEmail', sendConfirmationEmail);

app.post('/smsToken', smsToken);
app.post('/smsTokenVerify', smsTokenVerify);

app.get('/getGoogleAuthenticator', getGoogleAuthenticator);
app.post('/validateAuthenticatorSecret', validateAuthenticatorSecret);
app.post('/disableGoogleAuthenticator', disableGoogleAuthenticator);
app.post('/refreshToken', refreshToken);

export default app;
