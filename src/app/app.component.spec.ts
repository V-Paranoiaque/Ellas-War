import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Socket } from '../services/socketio.service';
import { User } from '../services/user.service';
import { OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import { PublicComponent } from './public/public.component';
import { PrivateComponent } from './private/private.component';

import { EwIcon } from '../services/ew-icon.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
        MenuComponent,
        PublicComponent,
        PrivateComponent,
        AppComponent,
        EwIcon
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
