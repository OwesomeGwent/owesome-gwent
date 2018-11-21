import App, { IServerSettings } from './App';
import cardParser from './cardParser';
import JSONCache from './JSONCache';
import routes from './routes';

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
