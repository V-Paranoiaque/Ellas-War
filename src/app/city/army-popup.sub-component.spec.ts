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

import { ArmyPopupSubComponent } from './army-popup.sub-component';
import { environment } from '../../environments/environment';

describe('ArmyPopupSubComponent', () => {
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
    const fixture = TestBed.createComponent(ArmyPopupSubComponent);
    const app = fixture.componentInstance;
    app.info = {
      code: 'spartan',
      attack: 0,
      defense: 0,
      type: 0,
      lvlmini: 0,
      rEngageNb: 0,
      rLiberateNb: 0,
      engageNb: '',
      rEngagePossible: 0,
      liberatenb: '',
      free: 0,
      placen: 0,
      placep: 0,
      placec: 0,
      resaler: {},
      resale: 0,
      nbmax: 0,
      temple: {
        artemis: 0,
        hephaestus: 0,
        dionysus: 0,
        ares: 0,
        zeus: 0,
        hades: 0,
      },
      cost: {},
      consumption: {},
      camp_level: 0,
      power: '',
      power_level: 0,
      error: 0,
      building: {
        militarycamp: 0,
      },
      condition: {
        ranking: 0,
      },
    };
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
