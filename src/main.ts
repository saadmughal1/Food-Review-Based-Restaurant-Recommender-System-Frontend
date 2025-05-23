import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BaseUrlInterceptor } from './app/services/base-url-interceptor.interceptor';
import { withInterceptors } from '@angular/common/http';

import { provideHttpClient } from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(withInterceptors([BaseUrlInterceptor]))
  ]
})
  .catch((err) => console.error(err));
