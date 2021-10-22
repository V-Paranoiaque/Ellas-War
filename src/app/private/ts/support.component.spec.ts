import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
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
import { SupportComponent } from './support.component';
import { EwIconSubComponent } from '../../../services/ew-icon.service';
import { environment } from '../../../environments/environment';

describe('SupportComponent', () => {
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

describe('SupportComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        IconModule,
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'id': '1' , 'msg': '1'} ) } } },
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
