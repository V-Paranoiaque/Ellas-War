import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { environment } from '../../../environments/environment';

describe('AuthComponent Empty', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AuthComponent
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
        HttpClientTestingModule,
                ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User, OAuthService, 
        TranslateService,
        BsModalService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( {  } ) }} },
      ],
    }).compileComponents();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

describe('AuthComponent Facebook', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AuthComponent
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
        HttpClientTestingModule,
                ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'provider': 'facebook' } ), 'fragment': 'test&test' }} },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('test facebook', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

describe('AuthComponent Google', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AuthComponent
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
        HttpClientTestingModule,
                ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'provider': 'google' } ), 'fragment': 'id_token=test' }} },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('test google', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
