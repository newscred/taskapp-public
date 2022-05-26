import { createApp } from './app';
import { appPort } from './config';

const app = createApp();

// start the Express server
app.listen(appPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${ appPort }`);
});
