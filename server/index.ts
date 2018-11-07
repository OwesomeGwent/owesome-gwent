import routes from './routes';
import App, { IServerSettings } from './App';
import JSONCache from './JSONCache';
import cardParser from './cardParser';

const serverSettings: IServerSettings = {
  port: 8080,
  routes,
};

cardParser();

const cache = new JSONCache();
cache.runBatch();

const server = new App();

server.start(serverSettings);

export { cache };
