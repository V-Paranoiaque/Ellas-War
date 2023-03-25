import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SocketComponent as Socket } from '../services/socketio.service';
import { UserComponent as User } from '../services/user.service';
import { OAuthModule, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';

import { EwIconSubComponent } from '../services/ew-icon.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AdminComponent,
        MenuComponent,
        PublicComponent,
        PrivateComponent,
        AppComponent,
        EwIconSubComponent
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        LoggerModule.forRoot({
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.DEBUG,
        }),
        HttpClientTestingModule
      ],
      providers: [
        Socket, User, OAuthService,
        OAuthLogger,
        UrlHelperService
      ],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it(`should have as title 'Ellas War'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Ellas War');
  });
  
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.innerHTML).toContain('router-outlet');
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
