import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
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
import { AdminNewsComponent, newsType } from './admin-news.component';
import { environment } from '../../../environments/environment';

describe('AdminNewsComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        AdminNewsComponent,
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
    const fixture = TestBed.createComponent(AdminNewsComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('test setNews', () => {
    const fixture = TestBed.createComponent(AdminNewsComponent);
    const app = fixture.componentInstance;
    
    let object = {}
    app.setNews(object);
    
    fixture.detectChanges();
    expect(app.newsSelected).toEqual(object as newsType);
  });
  
  it('test newsDelete', () => {
    const fixture = TestBed.createComponent(AdminNewsComponent);
    const app = fixture.componentInstance;
    
    let object = {'news_id': 0}
    app.setNews(object);
    app.newsDelete();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test newsModify', () => {
    const fixture = TestBed.createComponent(AdminNewsComponent);
    const app = fixture.componentInstance;
    
    app.newsModify();
    
    app.setNews({'title': 'test'});
    app.newsModify();
    
    app.setNews({'title': 'test', 'link': 'test'});
    app.newsModify();
    
    app.setNews({'title': 'test', 'link': 'test', 'author': 'test'});
    app.newsModify();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test newsNew', () => {
    const fixture = TestBed.createComponent(AdminNewsComponent);
    const app = fixture.componentInstance;
    
    app.newsNew();
    
    app.setNews({'title': 'test'});
    app.newsNew();
    
    app.setNews({'title': 'test', 'link': 'test'});
    app.newsNew();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
});

describe('AdminNewsComponent with ID', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AdminNewsComponent,
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
        BsModalService, FormBuilder,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { 'id': '1' } ) } } },
      ],
    });
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(AdminNewsComponent);
    fixture.detectChanges();
  });

  let fixture: ComponentFixture<AdminNewsComponent>;

  it('check id 1', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
