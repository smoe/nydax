import express from 'express';
import getFavouriteCharts from '../controllers/user/getFavouriteCharts';
import addFavouriteChart from '../controllers/user/addFavouriteChart';
import removeFavouriteChart from '../controllers/user/removeFavouriteChart';

const app = express();

app.get('/', getFavouriteCharts);
app.post('/:id', addFavouriteChart);
app.delete('/:id', removeFavouriteChart);

export default app;
