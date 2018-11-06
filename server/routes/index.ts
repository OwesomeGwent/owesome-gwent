import express from 'express';
import defs from './defs';

const route = express.Router();

route.use('/defs', defs);

export default route;
