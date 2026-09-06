import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { AllianceGiveFavorPopupSubComponent } from './alliance-give-favor-popup.sub-component';
import { environment } from '../../environments/environment';

describe('AllianceGiveFavorPopupSubComponent', () => {
  let socket: Socket;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ...appConfig.imports
      ],
      providers: [...appConfig.providers],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });

  it('should create the service', () => {
    const fixture = TestBed.createComponent(AllianceGiveFavorPopupSubComponent);
    const app = fixture.componentInstance;
    app.info = {
      membre_id: 0,
      username: '',
      level: 0,
      freereturn: 0,
    };

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
