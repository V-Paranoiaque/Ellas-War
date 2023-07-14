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
import { FormBuilder } from '@angular/forms';

import { MenuComponent } from '../../menu/menu.component';
import { SanctuaryMessageSubComponent } from './sanctuary-message.sub-component';
import { environment } from '../../../environments/environment';

describe('SanctuaryMessageSubComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MenuComponent,
        SanctuaryMessageSubComponent,
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
    const fixture = TestBed.createComponent(SanctuaryMessageSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'unitSend': {}
    }
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
