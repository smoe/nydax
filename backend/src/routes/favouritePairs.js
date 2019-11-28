import express from 'express';
import getFavouritePairs from '../controllers/user/getFavouritePairs';
import toggleFavouritePair from '../controllers/user/toggleFavouritePair';

const app = express();

app.get('/', getFavouritePairs);
app.post('/:id', toggleFavouritePair);
// app.delete('/:id', (req, res) => {});

export default app;
