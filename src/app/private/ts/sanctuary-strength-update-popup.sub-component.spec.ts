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
import { SanctuaryStrengthUpdatePopupSubComponent } from './sanctuary-strength-update-popup.sub-component';
import { environment } from '../../../environments/environment';

describe('SanctuaryStrengthUpdatePopupSubComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MenuComponent,
        SanctuaryStrengthUpdatePopupSubComponent,
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
    const fixture = TestBed.createComponent(SanctuaryStrengthUpdatePopupSubComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test canUpdate', () => {
    const fixture = TestBed.createComponent(SanctuaryStrengthUpdatePopupSubComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    expect(app.canUpdate()).toBeTrue();
  });
  
  it('test canUpdate too much power', () => {
    const fixture = TestBed.createComponent(SanctuaryStrengthUpdatePopupSubComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.info = {
      'sanctuaries_id': 0,
      'price': {'drachma': 1},
      'sanctuaries_power': 100
    };
    
    expect(app.canUpdate()).toBeFalse();
  });
  
  it('test canUpdate not enough resources', () => {
    const fixture = TestBed.createComponent(SanctuaryStrengthUpdatePopupSubComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.user.setUser({'drachma': 1, 'wood': 10});
    app.info = {
      'sanctuaries_id': 0,
      'price': {'drachma': 1000, 'wood': 1000},
      'sanctuaries_power': 0
    };
    
    expect(app.canUpdate()).toBeFalse();
  });
  
  it('test canUpdate enough resources', () => {
    const fixture = TestBed.createComponent(SanctuaryStrengthUpdatePopupSubComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.user.setUser({'drachma': 100000, 'wood': 1000000});
    app.info = {
      'sanctuaries_id': 0,
      'price': {'drachma': 1000, 'wood': 1000},
      'sanctuaries_power': 0
    };
    
    expect(app.canUpdate()).toBeTrue();
  });
  
  it('test strengthen', () => {
    const fixture = TestBed.createComponent(SanctuaryStrengthUpdatePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'sanctuaries_id': 0
    };
    app.strengthen();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
