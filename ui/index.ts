import chalk from 'chalk';
import express from 'express';
import proxy from 'http-proxy-middleware';
import path from 'path';

const clientPath = path.resolve(process.cwd(), '../', 'client');
const outputPath = path.resolve(clientPath, 'build');
const publicPath = '/';

const server = express();

/* static 설정 */
server.use(publicPath, express.static(outputPath));
/* proxy 설정 */
server.use(
  '/api',
  proxy({ target: 'http://localhost:8080', changeOrigin: true }),
);
/* ui server 설정 */
server.get('*', (req, res) => {
  res.sendFile(path.resolve(outputPath, 'index.html'));
});

server.listen(3000, () => {
  console.log(chalk.cyan('start client server'));
});
