import createCardDatas from './cardParser';
import chalk from 'chalk';
import routes from './routes';
import App, { IServerSettings } from './App';

const IS_DEF_DATA_CHANGE = false;

const serverSettings: IServerSettings = {
  port: 8080,
  routes,
};

console.log(
  chalk.bgGreen('  CHECK  ') + chalk.green(' Checking Card Definitions...'),
);
if (IS_DEF_DATA_CHANGE) {
  try {
    console.log(chalk.bgBlue(' START ') + chalk.blue(' Card Parse Start'));

    createCardDatas();
  } catch (err) {
    console.log(chalk.bgRed(' ERROR ') + chalk.red(' Card Parse Failed'));
    console.error(err);
  }
  console.log(chalk.bgGreen(' SUCCESS ') + chalk.green(' Card Parse Success'));
} else {
  console.log(
    chalk.bgGreen('   OK   ') + chalk.green(' Skipping Card Parse..'),
  );
}

const server = new App();

server.start(serverSettings);
