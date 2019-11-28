import express from 'express';
import multer from 'multer';
import uuidv4 from 'uuid/v4';
import setBaseCurrency from '../controllers/user/setBaseCurrency';
import setTimezone from '../controllers/user/setTimezone';
import inviteFriends from '../controllers/user/inviteFriends';
import uploadProfilePic from '../controllers/user/uploadProfilePic';
import deleteProfilePic from '../controllers/user/deleteProfilePic';
// import getAccountActivity from '../controllers/user/getAccountActivity';
import getProfile from '../controllers/user/getProfile';
import getAuthStatus from '../controllers/user/getAuthStatus';
import uploadIdentityInfo from '../controllers/user/uploadIdentityInfo';
import config from '../config';

const imageFilter = (req, file, cb) => { // eslint-disable-line
  // accept image only
  if (!file.mimetype.match(/(jpg|jpeg|png)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/images/users');
  },
  filename(req, file, cb) {
    const filename = file.mimetype.split('/');
    const extension = filename[filename.length - 1];
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const upload = multer({
  fileFilter: imageFilter,
  storage,
  limits: { fileSize: config.imageMaxSize },
});

const app = express();

app.post('/currency/:id', setBaseCurrency);
app.post('/timezone/:id', setTimezone);
app.post('/uploadProfilePic', upload.single('profilePic'), uploadProfilePic);
app.get('/deleteProfilePic', deleteProfilePic);
app.post('/invite', inviteFriends);
// app.get('/activity', getAccountActivity);
app.get('/profile', getProfile);
app.get('/authStatus', getAuthStatus);

app.post(
  '/identityVerification',
  upload.fields([
    { name: 'driverLicenseFrontPic', maxCount: 1 },
    { name: 'driverLicenseBackPic', maxCount: 1 },
    { name: 'identityCardFrontPic', maxCount: 1 },
    { name: 'identityCardBackPic', maxCount: 1 },
    { name: 'passportPic', maxCount: 1 },
    { name: 'facePic', maxCount: 1 },
  ]),
  uploadIdentityInfo,
);

// TODO: add a row to UserLogin in login time

export default app;
