import express from 'express';
import addOrder from '../controllers/order/addOrder';
import cancelOrder from '../controllers/order/cancelOrder';
import getOpenOrders from '../controllers/user/getOpenOrders';
import getOrderHistory from '../controllers/user/getOrderHistory';

const app = express();

app.get('/open', getOpenOrders);
app.get('/history', getOrderHistory);

// TODO: should handle sending orders to rabbitMq queues and respond to user with new open order after getting ack
// There are lots of checking about user order in this route. it is very important
// no direct relation with database
app.post('/new', addOrder);
app.post('/cancel', cancelOrder);

export default app;
