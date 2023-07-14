import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { of } from 'rxjs';

import { StrategiesComponent } from './strategies.component';

describe('StrategiesComponent Empty', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StrategiesComponent
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
        HttpClientTestingModule
      ],
      providers: [
        Socket, User,
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap( { } )) } },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection('dev.ellaswar.com');
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(StrategiesComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test waveAttackProcess', () => {
    const fixture = TestBed.createComponent(StrategiesComponent);
    const app = fixture.componentInstance;
    app.waveAttackProcess({
      'list': [{},{
        'spartan': 1
      },{
        'spartan': 1, 'myrmidon': 2
      },{
        'myrmidon': 2
      }],
      'power': 0
    });
    
    fixture.detectChanges();
    
    app.waveAttackMax = 1;
    app.waveAttackProcess({
      'list': [null, {
        'spartan': 1
      },{
        'spartan': 1, 'myrmidon': 2
      },{
        'myrmidon': 2
      }],
      'power': 0
    });
    
    expect(app).toBeTruthy();
  });
  
  it('test waveDefenseProcess', () => {
    const fixture = TestBed.createComponent(StrategiesComponent);
    const app = fixture.componentInstance;
    app.waveDefenseProcess({
      'list': [{},{
        'spartan': 1
      },{
        'spartan': 1, 'myrmidon': 2
      },{
        'myrmidon': 2
      }],
      'power': 0
    });
    
    fixture.detectChanges();
    
    app.waveDefenseMax = 1;
    app.waveDefenseProcess({
      'list': [null, {
        'spartan': 1
      },{
        'spartan': 1, 'myrmidon': 2
      },{
        'myrmidon': 2
      }],
      'power': 0
    });
    
    expect(app).toBeTruthy();
  });
  
});

describe('StrategiesComponent Attack', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StrategiesComponent
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
        HttpClientTestingModule
      ],
      providers: [
        Socket, User,
        { provide: ActivatedRoute, useValue: { snapshot: {paramMap: of(convertToParamMap( { 'type': 'attack' } ))}, paramMap: of(convertToParamMap( { 'type': 'attack' } )) } },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection('dev.ellaswar.com');
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(StrategiesComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

describe('StrategiesComponent Defense', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        StrategiesComponent
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
        HttpClientTestingModule
      ],
      providers: [
        Socket, User,
        { provide: ActivatedRoute, useValue: { snapshot: {paramMap: of(convertToParamMap( { 'type': 'defense' } ))}, paramMap: of(convertToParamMap( { 'type': 'defense' } )) } },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection('dev.ellaswar.com');
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(StrategiesComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
