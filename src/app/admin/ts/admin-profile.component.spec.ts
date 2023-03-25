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
import { IconModule } from '@visurel/iconify-angular';
import { FormBuilder } from '@angular/forms';

import { MenuComponent } from '../../menu/menu.component';
import { AdminProfileComponent } from './admin-profile.component';
import { environment } from '../../../environments/environment';

describe('AdminProfileComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        MenuComponent,
        AdminProfileComponent,
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
    const fixture = TestBed.createComponent(AdminProfileComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('test getProfile', () => {
    const fixture = TestBed.createComponent(AdminProfileComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.profile = {
      'membre_id': 0
    }
    app.getProfile();
    
    app.profile = {
      'membre_id': 1
    }
    app.getProfile();
    
    expect(app).toBeTruthy();
  });
  
  it('test adminUserBlock', () => {
    const fixture = TestBed.createComponent(AdminProfileComponent);
    const app = fixture.componentInstance;
    
    app.profile = {
      'membre_id': 1,
      'membre_status': 0
    };
    app.adminUserBlock();
    
    app.profile = {
      'membre_id': 1,
      'membre_status': 1
    };
    app.adminUserBlock();
    
    app.profile = {
      'membre_id': 1,
      'membre_status': 3
    };
    app.adminUserBlock();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test adminChatBlock', () => {
    const fixture = TestBed.createComponent(AdminProfileComponent);
    const app = fixture.componentInstance;
    
    app.profile = {
      'membre_id': 1,
      'chat_allowed': 0
    }
    app.adminChatBlock();
    
    app.profile = {
      'membre_id': 1,
      'chat_allowed': 1
    }
    app.adminChatBlock();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test adminAllianceChief', () => {
    const fixture = TestBed.createComponent(AdminProfileComponent);
    const app = fixture.componentInstance;
    
    app.profile = {
      'membre_id': 1
    }
    app.adminAllianceChief();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
