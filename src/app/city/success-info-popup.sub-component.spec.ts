import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { SuccessInfoPopupSubComponent } from './success-info-popup.sub-component';
import { environment } from '../../environments/environment';

describe('SuccessInfoPopupSubComponent', () => {
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
    const fixture = TestBed.createComponent(SuccessInfoPopupSubComponent);
    const app = fixture.componentInstance;
    app.successType = {
      selected: 1,
    };

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
