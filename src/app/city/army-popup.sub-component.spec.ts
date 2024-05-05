import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';

import { ArmyPopupSubComponent } from './army-popup.sub-component';
import { environment } from '../../environments/environment';

describe('ArmyPopupSubComponent', () => {
  let socket: Socket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ArmyPopupSubComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient],
          },
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [Socket, User, OAuthService, BsModalService, FormBuilder],
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

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
