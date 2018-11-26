import bodyParser from 'body-parser';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();
export interface IServerSettings {
  port: number | string;
  routes: Router;
}

class App {
  public server = express();

  public start({ port, routes }: IServerSettings) {
    try {
      this.init();
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

  private init() {
    this.server.use(cookieParser());
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(helmet());
    this.server.use(morgan('dev'));
  }
}

export default App;
