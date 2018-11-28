import express from 'express';
import auth from './auth';
import deck from './deck';
import defs from './defs';

const route = express.Router();

route.use('/auth', auth);
route.use('/deck', deck);
route.use('/defs', defs);
export default route;
