import express from 'express';
import getWallets from '../controllers/user/getWallets';

const app = express();

app.get('/', getWallets);

export default app;
