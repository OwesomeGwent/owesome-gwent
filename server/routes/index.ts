import express from 'express';
import auth from './auth';
import defs from './defs';

const route = express.Router();

route.use('/auth', auth);
route.use('/defs', defs);
export default route;
