import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import { LoadingInterceptor } from './loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
	provideHttpClient(
		withFetch(),
        withInterceptorsFromDi()
  	),
	{
        provide:HTTP_INTERCEPTORS,
        useClass:LoadingInterceptor,
        multi:true
    }
  ]
};
