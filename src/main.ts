import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/app.config';
import { App } from './app/ui/main/app';
import { environment } from './environments/environment';

if (environment.production) {
  console.log = () => { }; // this will disable all the logs in production mode
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
