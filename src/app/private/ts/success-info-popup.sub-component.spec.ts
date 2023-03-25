import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { SuccessInfoPopupSubComponent } from './success-info-popup.sub-component';
import { environment } from '../../../environments/environment';

describe('SuccessInfoPopupSubComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MenuComponent,
        SuccessInfoPopupSubComponent,
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
    const fixture = TestBed.createComponent(SuccessInfoPopupSubComponent);
    const app = fixture.componentInstance;
    app.successType = 0;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('should create the service on mobile', () => {
    const fixture = TestBed.createComponent(SuccessInfoPopupSubComponent);
    const app = fixture.componentInstance;
    app.successType = 0;
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test calculate', () => {
    const fixture = TestBed.createComponent(SuccessInfoPopupSubComponent);
    const app = fixture.componentInstance;

    app.hfNext = [
      null,
      {'test': 'test'},
      {'id': 1, 'type': 1},
      {'id': 2, 'type': 2},
      {'id': 3, 'type': 3},
      {'id': 7, 'type': 7}
    ];
    
    app.hfDisplay = [
      null,
      {'test': 'test'},
      {'id': 1, 'type': 1},
      {'id': 2, 'type': 2},
      {'id': 7, 'type': 7}
    ];
    
    app.successType = {'selected': 0};
    app.calculate();
    
    app.successType = {'selected': 1};
    app.calculate();
    
    app.successType = {'selected': 7};
    app.calculate();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
