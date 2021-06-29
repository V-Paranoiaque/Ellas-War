import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EwIcon } from '../services/ew-icon.service';
import { ClipboardModule } from 'ngx-clipboard';
import { Socket } from '../services/socketio.service';
import { User } from '../services/user.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@visurel/iconify-angular';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    PublicComponent,
    PrivateComponent,
    AppComponent,
    EwIcon
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule, ReactiveFormsModule,
    ClipboardModule,
    IconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    OAuthModule.forRoot(),
    DragDropModule,
    ModalModule.forRoot(),
  ],
  providers: [Socket, User],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
