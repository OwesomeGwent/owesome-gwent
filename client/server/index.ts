import express from 'express';
import proxy from 'http-proxy-middleware';
import path from 'path';

const outputPath = path.resolve(process.cwd(), 'build');
const publicPath = '/';

const server = express();

server.use(publicPath, express.static(outputPath));
server.use(
  '/api',
  proxy({ target: 'http://localhost:8080', changeOrigin: true }),
);
server.get('*', (req, res) => {
  res.sendFile(path.resolve(outputPath, 'index.html'));
});
server.listen(3000, () => console.log('start client server'));
