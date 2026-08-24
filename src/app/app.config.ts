import { BrowserModule } from '@angular/platform-browser';
import { provideZoneChangeDetection, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppRoutingModule, routes } from './app.routes';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
} from '@angular/common/http';
import { provideTranslateService, TranslateService, TranslateStore } from '@ngx-translate/core';

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
    ClipboardModule,
    DragDropModule,
    FormsModule,
    OAuthModule.forRoot(),
    ReactiveFormsModule,
    ModalModule,
  ],
  providers: [
    provideZoneChangeDetection(),
    TranslateStore,
    Socket,
    Tools,
    UrlHelperService,
    User,
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient(),
    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
    provideRouter(routes),
    importProvidersFrom(ModalModule),
  ],
};

export function currentLocale(): string {
  const translate = inject(TranslateService);
  return translate.getCurrentLang() ?? 'en';
}
