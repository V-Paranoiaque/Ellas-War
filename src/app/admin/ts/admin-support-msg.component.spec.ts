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
import { IconModule } from '@visurel/iconify-angular';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MenuComponent } from '../../menu/menu.component';
import { AdminSupportMsgComponent } from './admin-support-msg.component';
import { environment } from '../../../environments/environment';

describe('AdminSupportMsgComponent List', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        MenuComponent,
        AdminSupportMsgComponent,
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
      ],
      providers: [
        Socket, User, OAuthService,
        BsModalService, FormBuilder,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of(convertToParamMap( {  } )) }, paramMap: of(convertToParamMap( {  } ))} },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(AdminSupportMsgComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
});

describe('AdminSupportMsgComponent Inside', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AdminSupportMsgComponent
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
      ],
      providers: [
        Socket, User, 
        { provide: ActivatedRoute, useValue: { snapshot: {}, paramMap: of(convertToParamMap( { 'msg': 1 } )) } },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(AdminSupportMsgComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test adminMsgAnswer', () => {
    const fixture = TestBed.createComponent(AdminSupportMsgComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    
    app.adminMsgAnswer();
    
    app.answertext = '',
    app.adminMsgAnswer();
    
    app.answertext = 'test',
    app.adminMsgAnswer();
    
    expect(app).toBeTruthy();
  });
  
  it('test adminSupportStatus', () => {
    const fixture = TestBed.createComponent(AdminSupportMsgComponent);
    const app = fixture.componentInstance;
    
    fixture.detectChanges();
    app.adminSupportStatus();
    
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
