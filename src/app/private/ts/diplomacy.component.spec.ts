import { TestBed } from '@angular/core/testing';
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
import { DiplomacyComponent } from './diplomacy.component';
import { EwIconSubComponent } from '../../../services/ew-icon.service';

describe('DiplomacyComponent', () => {
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
    const fixture = TestBed.createComponent(DiplomacyComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('test allianceListOrder', () => {
    const fixture = TestBed.createComponent(DiplomacyComponent);
    const app = fixture.componentInstance;
    
    app.allianceListOrder('test');
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test allianceWaitCancel', () => {
    const fixture = TestBed.createComponent(DiplomacyComponent);
    const app = fixture.componentInstance;
    
    app.allianceWaitCancel();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test allianceListOrder', () => {
    const fixture = TestBed.createComponent(DiplomacyComponent);
    const app = fixture.componentInstance;
    
    app.getProfile(0);
    app.getProfile(17);
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test setAlliance', () => {
    const fixture = TestBed.createComponent(DiplomacyComponent);
    const app = fixture.componentInstance;
    
    app.setAlliance({});
    app.setAlliance({'pact_id': 1});
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
