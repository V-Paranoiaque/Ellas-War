import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
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
import { CommonTopBarComponent } from './common-top-bar.component';
import { environment } from '../../../environments/environment';

describe('CommonTopBarComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        MenuComponent,
        CommonTopBarComponent,
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
    const fixture = TestBed.createComponent(CommonTopBarComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
  
  it('disconnect', () => {
    const fixture = TestBed.createComponent(CommonTopBarComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.disconnect();
    
    expect(app).toBeTruthy();
  });
  
  it('checkVersion', () => {
    const fixture = TestBed.createComponent(CommonTopBarComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.onHidden();
    
    expect(app).toBeTruthy();
  });
  
  it('checkVersion', () => {
    const fixture = TestBed.createComponent(CommonTopBarComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.localVersion = 0;
    app.checkVersion();
    
    app.localVersion  = 1;
    app.remoteVersion = 2;
    app.checkVersion();
    
    app.localVersion  = 2;
    app.remoteVersion = 1;
    app.checkVersion();

    expect(app).toBeTruthy();
  });
  
  it('checkMaintenance', () => {
    const fixture = TestBed.createComponent(CommonTopBarComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.checkMaintenance(0);
    expect(app.displayMaintenanceModal).toEqual(false);

    app.checkMaintenance(1);
    expect(app.displayMaintenanceModal).toEqual(true);
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
