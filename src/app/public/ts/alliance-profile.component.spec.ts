import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute , convertToParamMap} from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AllianceProfileComponent } from './alliance-profile.component';
import { environment } from '../../../environments/environment';

describe('AllianceProfileComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AllianceProfileComponent
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
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( {  } ) }} },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(AllianceProfileComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.getProfile()
    expect(app).toBeTruthy();
  });
  
});

describe('AllianceProfileComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AllianceProfileComponent
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
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'id': 17 } ) }} },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('Test getProfile not working', () => {
    const fixture = TestBed.createComponent(AllianceProfileComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    spyOn(app.http, 'get').and.returnValue(of(null));
    app.getProfile();
    expect(app.allianceProfile).toEqual({});
    
  });
  
  it('Test getProfile working', () => {
    const fixture = TestBed.createComponent(AllianceProfileComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    const res = {'alliance_name': 'test'}
    spyOn(app.http, 'get').and.returnValue(of(res));
    
    app.allianceProfile = undefined;
    app.getProfile();
    expect(app.allianceProfile).toBeDefined()
    expect(app.allianceProfile).toEqual(res);
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
