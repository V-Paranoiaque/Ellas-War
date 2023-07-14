import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { MenuComponent } from '../../menu/menu.component';
import { PrivateComponent } from '../private.component';
import { SupportComponent } from './support.component';
import { EwIconSubComponent } from '../../../services/ew-icon.service';
import { environment } from '../../../environments/environment';

describe('SupportComponent Empty', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
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
                ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User, OAuthService,
        BsModalService,
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of(convertToParamMap( { } )) }, paramMap: of(convertToParamMap( { } )) },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection('dev.ellaswar.com');
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(SupportComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('test contactAnswer', () => {
    const fixture = TestBed.createComponent(SupportComponent);
    const app = fixture.componentInstance;
    
    app.contactAnswer();
    
    app.msg = 0;
    app.answerMsg = 'test';
    app.contactAnswer();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test contactNewSend', () => {
    const fixture = TestBed.createComponent(SupportComponent);
    const app = fixture.componentInstance;
    
    app.contactNewSend();
    
    app.contactNewTitle = 'test';
    app.contactNewSend();
    
    app.contactNewMsg = 'test';
    app.contactNewSend();
  });
  
  it('test loadSupport', () => {
    const fixture = TestBed.createComponent(SupportComponent);
    const app = fixture.componentInstance;
    
    app.msg = 0;
    app.loadSupport();
    
    app.msg = 1;
    app.loadSupport();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

describe('SupportComponent ID', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        SupportComponent
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
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of(convertToParamMap( { 'id': '1' , 'msg': '1'} )) } },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service with parameters', () => {
    const fixture = TestBed.createComponent(SupportComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
