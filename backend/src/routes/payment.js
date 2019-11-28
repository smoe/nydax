import express from 'express';
import submitPayment from '../controllers/payment/submitPayment';
import addPayment from '../controllers/payment/addPayment';
import getPayment from '../controllers/payment/getPayment';

const app = express();

app.post('/submit', submitPayment);
app.post('/', addPayment);
app.get('/', getPayment);

export default app;
