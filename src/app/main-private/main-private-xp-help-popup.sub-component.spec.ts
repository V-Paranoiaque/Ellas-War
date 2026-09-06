import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { MainPrivateXpHelpPopupSubComponent } from './main-private-xp-help-popup.sub-component';
import { environment } from '../../environments/environment';

describe('MainPrivateXpHelpPopupSubComponent', () => {
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
    const fixture = TestBed.createComponent(MainPrivateXpHelpPopupSubComponent);
    const app = fixture.componentInstance;
    app.info = {
      player1: 1000,
      player2: 1000,
    };

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
