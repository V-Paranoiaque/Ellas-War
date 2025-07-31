import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OAuthModule } from 'angular-oauth2-oidc';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withJsonpSupport,
} from '@angular/common/http';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { ClipboardModule } from 'ngx-clipboard';
import { SocketComponent as Socket } from '../services/socketio.service';
import { ToolsComponent as Tools } from '../services/tools.service';
import { UserComponent as User } from '../services/user.service';

@NgModule({
  bootstrap: [AppComponent],
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
    TranslateModule.forRoot({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
  providers: [
    TranslateStore,
    Socket,
    User,
    Tools,
    provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
  ],
})
export class AppModule {}
