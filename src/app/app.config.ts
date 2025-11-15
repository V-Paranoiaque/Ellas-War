import { BrowserModule } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';
import { AppRoutingModule, routes } from './app.routes';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {
  OAuthModule,
  provideOAuthClient,
  UrlHelperService,
} from 'angular-oauth2-oidc';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withJsonpSupport,
} from '@angular/common/http';
import { provideTranslateService, TranslateStore } from '@ngx-translate/core';

import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { ClipboardModule } from 'ngx-clipboard';
import { SocketComponent as Socket } from '../services/socketio.service';
import { ToolsComponent as Tools } from '../services/tools.service';
import { UserComponent as User } from '../services/user.service';

export const appConfig = {
  bootstrap: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClipboardModule,
    DragDropModule,
    FormsModule,
    ModalModule.forRoot(),
    OAuthModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    TranslateStore,
    Socket,
    Tools,
    UrlHelperService,
    User,
    provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
    provideOAuthClient(),
    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
    provideRouter(routes),
  ],
};
