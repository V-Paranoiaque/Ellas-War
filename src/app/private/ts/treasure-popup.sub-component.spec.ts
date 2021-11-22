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
import { TreasurePopupSubComponent } from './treasure-popup.sub-component';
import { environment } from '../../../environments/environment';

describe('TreasurePopupSubComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        TreasurePopupSubComponent,
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
    const fixture = TestBed.createComponent(TreasurePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'amount': 0,
      'treasureMode': 0
    };
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(TreasurePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'amount': 0,
      'treasureMode': 0
    };
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('level 1', () => {
    const fixture = TestBed.createComponent(TreasurePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'amount': 0,
      'treasureMode': 0
    };
    
    app.user.setUser({'level': 1, 'hermes': 0})
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('level 5', () => {
    const fixture = TestBed.createComponent(TreasurePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'amount': 0,
      'treasureMode': 0
    };
    
    app.user.setUser({'level': 5, 'hermes': 1})
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('level 10', () => {
    const fixture = TestBed.createComponent(TreasurePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'amount': 0,
      'treasureMode': 0
    };
    
    app.user.setUser({'level': 10, 'hermes': 1})
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test setTreasure', () => {
    const fixture = TestBed.createComponent(TreasurePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'amount': 0,
      'treasureMode': 0
    };
    
    app.setTreasure(0);
    
    app.deposit = 'deposit';
    app.setTreasure(0);
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test setTreasureMode', () => {
    const fixture = TestBed.createComponent(TreasurePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'amount': 0,
      'treasureMode': 0
    };
    
    app.setTreasureMode(0);
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test treasureAction', () => {
    const fixture = TestBed.createComponent(TreasurePopupSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'amount': -1,
      'treasureMode': 0
    };
    
    app.treasureAction();
    
    app.info.amount = 0;
    app.treasureAction();
    
    app.info.amount = 1;
    app.deposit = 'no';
    app.treasureAction();
    
    app.info.amount = 1;
    app.deposit = 'deposit';
    app.treasureAction();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  
  
    
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
