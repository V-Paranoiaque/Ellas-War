import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from './socketio.service';
import { UserComponent as User } from './user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';

import { EwIconSubComponent } from './ew-icon.service';
import { environment } from '../environments/environment';

describe('EwIconSubComponent', () => {
  let socket: Socket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EwIconSubComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient],
          },
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [Socket, User, OAuthService, BsModalService, FormBuilder],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });

  it('should create the service', () => {
    const fixture = TestBed.createComponent(EwIconSubComponent);
    const app = fixture.componentInstance;
    app.name = 'ambrosia';

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should create the service, no match', () => {
    const fixture = TestBed.createComponent(EwIconSubComponent);
    const app = fixture.componentInstance;
    app.name = 'dummy';

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
