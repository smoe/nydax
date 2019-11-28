import express from 'express';
import getDayHistory from '../controllers/price/getDayHistory';
import getMinuteHistory from '../controllers/price/getMinuteHistory';
import getTickHistory from '../controllers/price/getTickHistory';
import getWeeklyChart from '../controllers/price/getWeeklyChart';

const app = express();

app.get('/dayHistory', getDayHistory);
app.get('/minuteHistory', getMinuteHistory);
app.get('/tickHistory', getTickHistory);
app.get('/weeklyChart', getWeeklyChart);

export default app;
