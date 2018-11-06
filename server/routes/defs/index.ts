import fs from 'fs';
import path from 'path';
import express from 'express';
import { CardData } from '../../../shared/CardData';
import { LocaleData } from '../../../shared/LocaleData';

interface IDefCache {
  'card-data'?: CardData;
  [defInfo: string]: CardData | LocaleData | undefined;
}

const routes = express.Router();
let cache: IDefCache = {};

routes.get('/:defInfo', (req, res) => {
  const { defInfo } = req.params;
  if (cache[defInfo]) {
    return res.json({
      data: cache[defInfo],
    });
  }
  fs.readFile(path.join('parsed', `${defInfo}.json`), (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).json({
        message: 'Cannot Find Info',
      });
    }
    res.json({
      data: JSON.parse(data.toString('utf-8')),
    });
  });
});

export default routes;
