import { BrowserModule } from '@angular/platform-browser';
import { provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
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
import { provideTranslateService, TranslateDirective, TranslateLoader, TranslatePipe, TranslateStore } from '@ngx-translate/core';
import { firstValueFrom, of } from 'rxjs';

import { ClipboardModule } from 'ngx-clipboard';
import { SocketComponent as Socket } from '../services/socketio.service';
import { ToolsComponent as Tools } from '../services/tools.service';
import { UserComponent as User } from '../services/user.service';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string) {
    return of({});
  }
}

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
    TranslateDirective,
    TranslatePipe,
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
      loader: {
        provide: TranslateLoader,
        useClass: FakeTranslateLoader,
      }
    }),
    provideRouter(routes),
    importProvidersFrom(ModalModule),
  ],
};

describe('FakeTranslateLoader', () => {
  it('should return an empty translation object', async () => {
    const loader = new FakeTranslateLoader();

    const result = await firstValueFrom(loader.getTranslation('fr'));

    expect(result).toEqual({});
  });
});
