import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AllianceMembersComponent } from './alliance-members.component';
import { environment } from '../../../environments/environment';

describe('AllianceMembersComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        AllianceMembersComponent
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
        TranslateService,
        BsModalService
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(AllianceMembersComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('Test getMembers null', () => {
    const fixture = TestBed.createComponent(AllianceMembersComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    spyOn(app.http, 'get').and.returnValue(of(null));
    app.getMembers();
    expect(app.allianceMembers).toEqual([]);
  });
  
  it('Test getProfile null', () => {
    const fixture = TestBed.createComponent(AllianceMembersComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    spyOn(app.http, 'get').and.returnValue(of(null));
    app.getProfile();
    expect(app.allianceProfile).toEqual('');
  });
  
  it('Test getMembers working', () => {
    const fixture = TestBed.createComponent(AllianceMembersComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    let info = [{'name': 'test'}];
    
    spyOn(app.http, 'get').and.returnValue(of(info));
    app.getMembers();
    expect(app.allianceMembers).toEqual(info);
  });
  
  it('Test getProfile working', () => {
    const fixture = TestBed.createComponent(AllianceMembersComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    let info = {'alliance_name': 'test'};
    
    spyOn(app.http, 'get').and.returnValue(of(info));
    app.getProfile();
    expect(app.allianceProfile).toEqual(info);
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
