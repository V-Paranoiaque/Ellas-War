import { TestBed } from '@angular/core/testing';
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

import { MenuComponent } from '../../menu/menu.component';
import { AllianceRequestsPopupSubComponent } from './alliance-requests-popup.sub-component';
import { environment } from '../../../environments/environment';

describe('AllianceRequestsPopupSubComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        AllianceRequestsPopupSubComponent,
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
        BsModalService, FormBuilder
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(AllianceRequestsPopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'resource': 'drachma',
      'quantity': 0
    };
    app.profile = {};
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test askRess', () => {
    const fixture = TestBed.createComponent(AllianceRequestsPopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'resource': 'drachma',
      'quantity': 0
    };
    app.profile = {};
    
    app.askRess();
    
    app.info = {
      'resource': 'drachma',
      'quantity': 1
    };
    app.askRess();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test myAllianceAsk', () => {
    const fixture = TestBed.createComponent(AllianceRequestsPopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'resource': 'drachma',
      'quantity': 0
    };
    app.profile = {};
    
    app.myAllianceAskAccept(0);
    app.myAllianceAskCancel(0);
    app.myAllianceAskRefuse(0);
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
