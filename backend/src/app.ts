import express, { urlencoded, json, Application } from 'express';

import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieparser from 'cookie-parser';

import { Configuration } from './configs';
import { connect } from './db/db-connect';

import { errorHandle } from './middlewares/errorHandling';

import router from './routes';

const { environment, url, server, db } = Configuration.appConfig;

class App {
  private readonly app: Application;

  private readonly port = server.PORT;

  private readonly URL = server.URL;

  private readonly env = environment;

  constructor() {
    this.app = express();

    this.setAppMiddlewares();

    connect(db.MONGO_URL);
  }

  private setAppMiddlewares(): void {
    this.app.disable('x-powered-by');
    this.app.set('trust proxy', 1);

    const middlewares = [
      cors({ origin: [url, '*'], credentials: true }),
      hpp(),
      helmet(),
      compression(),
      json({ limit: '1kb' }),
      urlencoded({ extended: false, limit: '1kb', parameterLimit: 10 }),
      cookieparser(),
    ];

    this.app.use(middlewares);

    this.app.get('/', (_, res) => {
      return res.status(200).json({ message: 'okk' });
    });

    this.app.use('/api', router);
  }

  public start() {
    this.app.use(errorHandle);
    return this.app.listen(this.port, () => {
      console.log(`App is running at ${this.URL} in ${this.env} mode.`);
    });
  }
}

export default App;
