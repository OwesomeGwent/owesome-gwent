import routes from './routes';
import shell from 'shelljs';
import App, { IServerSettings } from './App';
import JSONCache from './JSONCache';

const serverSettings: IServerSettings = {
  port: 8080,
  routes,
};

const cache = new JSONCache();
cache.runBatch();

const server = new App();

server.start(serverSettings);

export { cache };
