import express, { RequestHandler, Router } from 'express';
import chalk from 'chalk';
import helmet from 'helmet';
import morgan from 'morgan';

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
    this.server.use(helmet());
    this.server.use(morgan('dev'));
  }
}

export default App;
