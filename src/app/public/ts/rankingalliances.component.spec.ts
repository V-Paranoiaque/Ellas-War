import { TestBed, inject } from '@angular/core/testing';
import { Router, ActivatedRoute , convertToParamMap} from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { RankingAlliancesComponent } from './rankingalliances.component';
import { environment } from '../../../environments/environment';

describe('RankingAlliancesComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [
        RankingAlliancesComponent
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
        BsModalService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'id': null } ) } } },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(RankingAlliancesComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('test rankingChooseOrder', () => {
    const fixture = TestBed.createComponent(RankingAlliancesComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.rankingChooseOrder('level')
    
    expect(app).toBeTruthy();
  });
  
  it('test rankingPageChange 0', inject([Router], (router: Router) => {
    const fixture = TestBed.createComponent(RankingAlliancesComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.rankingOrder = 'xp';
    
    spyOn(router, 'navigate');
    app.rankingPageChange(0);
  }));
  
  it('test rankingPageChange 10', inject([Router], (router: Router) => {
    const fixture = TestBed.createComponent(RankingAlliancesComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    
    app.rankingOrder = '';
    
    spyOn(router, 'navigate');
    app.rankingPageChange(10);
  }));
});


describe('RankingAlliancesComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RankingAlliancesComponent
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
        BsModalService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'id': 1 } ) } } },
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(RankingAlliancesComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('Test getProfile not working', () => {
    const fixture = TestBed.createComponent(RankingAlliancesComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    spyOn(app.http, 'get').and.returnValue(of({'cPage': 1}));
    app.getPage();
    expect(app.rankingPage).toEqual(1);
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
