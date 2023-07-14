import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes } from './core/constants/app.routes';
import { HttpErrorInterceptor, HttpTokenInterceptor } from './core/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([HttpTokenInterceptor, HttpErrorInterceptor])),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatSnackBarModule,
    ),
  ]
};

