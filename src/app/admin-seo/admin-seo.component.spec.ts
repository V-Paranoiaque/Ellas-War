import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminSeoComponent } from './admin-seo.component';
import { environment } from '../../environments/environment';

describe('AdminSeoComponent', () => {
  let socket: Socket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: provideTranslateHttpLoader({
            prefix: './assets/i18n/',
            suffix: '.json',
          }),
        }),
        OAuthModule.forRoot(),
      ],
      providers: [
        Socket,
        User,
        OAuthService,
        BsModalService,
        FormBuilder,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });

  it('should create the service', () => {
    const fixture = TestBed.createComponent(AdminSeoComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('test the service', () => {
    const fixture = TestBed.createComponent(AdminSeoComponent);
    const app = fixture.componentInstance;

    app.setSite({
      seo_id: 1,
      seo_name: 'dummy',
      seo_url: 'dummy_uröl',
      seo_store: 0,
      seo_active: 0,
    });
    app.seoNew();
    app.seoModify();
    app.seoDelete();

    fixture.detectChanges();
    expect(app.currentSite.seo_id).toEqual(1);

    app.seoRefresh({
      seo_id: 2,
      seo_name: 'dummy',
      seo_url: 'dummy_uröl',
      seo_store: 0,
      seo_active: 0,
    });
    expect(app.currentSite.seo_id).toEqual(2);
  });
});
