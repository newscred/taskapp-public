import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as routers from './controllers';

export function createApp(): express.Application {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  // app.use((err: Error, req: express.Request, res: express.Response) => {
  //   console.error(err.stack);
  //   res.status(500).json({ errors: [{ message: 'There was an error' }] });
  // });

  app.use('/', routers.healhCheckRouter);
  app.use('/', routers.authRouter);
  app.use('/', routers.usersRouter);

  return app;
}
