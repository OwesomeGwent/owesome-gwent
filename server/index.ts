import createCardDatas from './cardParser';
import chalk from 'chalk';

try {
  console.log(chalk.bgBlue('START') + chalk.blue('Card Parse Start'));
  createCardDatas();
} catch (err) {
  console.log(chalk.bgRed('ERROR') + chalk.red('Card Parse Failed'));
  console.error(err);
}
