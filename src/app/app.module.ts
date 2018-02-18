import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './layouts/not-found';

import { StoreService } from './services/store.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    SharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    CurrencyPipe,
    StoreService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
