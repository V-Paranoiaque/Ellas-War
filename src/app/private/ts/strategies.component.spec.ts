import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from '../../menu/menu.component';
import { PrivateComponent } from '../private.component';
import { StrategiesComponent } from './strategies.component';
import { EwIconSubComponent } from '../../../services/ew-icon.service';

describe('StrategiesComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        PrivateComponent,
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
        HttpClientTestingModule,
        IconModule,
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User, OAuthService,
        BsModalService
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection('dev.ellaswar.com');
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(StrategiesComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
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

describe('StrategiesComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        HttpClientTestingModule,
        IconModule,
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'type': 'defense' } ) } } },
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

describe('StrategiesComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        HttpClientTestingModule,
        IconModule,
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'type': 'test' } ) } } },
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
