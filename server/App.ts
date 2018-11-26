import bodyParser from 'body-parser';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

dotenv.config();

export interface IServerSettings {
  port: number | string;
  routes: Router;
}

class App {
  public server = express();

  public async start({ port, routes }: IServerSettings) {
    try {
      await this.init();
      this.server.use('/api', routes);
      this.server.listen(port, () => {
        console.log(
          chalk.bgGreen(' SUCCESS ') +
            chalk.green(` Listening On Port ${port}`),
        );
      });
    } catch (err) {
      console.log(
        chalk.bgGreen(' ERROR ') + chalk.green(` Server Start Failed`),
      );
    }
  }

  private async init() {
    try {
      console.log(chalk.magenta(`Connecting to Database...`));
      await createConnection();
    } catch (err) {
      console.error(err);
    }
    this.server.use(cookieParser());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(helmet());
    this.server.use(morgan('dev'));
  }
}

export default App;
