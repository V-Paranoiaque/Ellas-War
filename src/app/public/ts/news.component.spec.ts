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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        NewsComponent
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
                ReactiveFormsModule, FormsModule
      ],
      providers: [
        Socket, User, OAuthService, 
        TranslateService,
        BsModalService
      ],
    }).compileComponents();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(NewsComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
