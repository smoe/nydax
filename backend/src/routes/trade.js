import express from 'express';
import getTradeHistory from '../controllers/user/getTradeHistory';
// import { errors } from '../constants/messages';

const app = express();

// TODO: update it with ui required attributes
app.get('/', getTradeHistory);

export default app;
