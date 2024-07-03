import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';

import { OptionsComponent } from './options.component';
import { environment } from '../../environments/environment';

describe('OptionsComponent', () => {
  let socket: Socket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [OptionsComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient],
          },
        }),
        OAuthModule.forRoot(),
      ],
      providers: [
        Socket,
        User,
        OAuthService,
        BsModalService,
        FormBuilder,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });

  it('should create the service', () => {
    const fixture = TestBed.createComponent(OptionsComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should create the service, level >= 1', () => {
    const fixture = TestBed.createComponent(OptionsComponent);
    const app = fixture.componentInstance;
    app.user.setUser({ level: 1 });

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('Test accountEmail()', () => {
    const fixture = TestBed.createComponent(OptionsComponent);
    const app = fixture.componentInstance;
    app.accountEmail();

    fixture.detectChanges();
    expect(app.emailError).toEqual(1);

    app.newEmail = 'newmail';
    app.accountEmail();

    fixture.detectChanges();
    expect(app.emailError).toEqual(0);
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
