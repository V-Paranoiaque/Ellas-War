import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SocketComponent as Socket } from './socketio.service';
import { UserComponent as User } from './user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';

import { environment } from '../environments/environment';

describe('UserComponent', () => {
  let socket: Socket;
  let user: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [],
    imports: [TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
        }),
        OAuthModule.forRoot()],
    providers: [
        provideRouter([]),
        Socket,
        User,
        OAuthService,
        BsModalService,
        FormBuilder,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
    user = TestBed.inject(User);
  });

  it('UserComponent', () => {
    expect(User).toBeTruthy();
  });

  it('User init', () => {
    user.setInit();
    expect(user.getInit()).toEqual(1);
  });

  it('User getPropertyNb', () => {
    expect(user.getPropertyNb('foo-bar')).toEqual(0);
    user.setProperty('level', 1);
    expect(user.getPropertyNb('level')).toEqual(1);
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
