import fs from 'fs';
import path from 'path';
import express from 'express';
import { cache } from '../../index';

const routes = express.Router();

routes.get('/:defInfo', (req, res) => {
  const { defInfo } = req.params;
  if (cache.hasJSON(defInfo)) {
    return res.json({
      data: cache.getJSON(defInfo),
    });
  }
  fs.readFile(path.join('parsed', `${defInfo}.json`), (err, buffer) => {
    if (err) {
      console.error(err);
      return res.status(404).json({
        message: 'Cannot Find Info',
      });
    }
    const data = JSON.parse(buffer.toString('utf-8'));
    cache.setJSON(defInfo, data);
    res.json({
      data,
    });
  });
});

export default routes;
