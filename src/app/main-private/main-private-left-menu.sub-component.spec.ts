import { TestBed } from '@angular/core/testing';
import { jest } from '@jest/globals';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { MainPrivateLeftMenuSubComponent } from './main-private-left-menu.sub-component';
import { environment } from '../../environments/environment';

describe('MainPrivateLeftMenuSubComponent', () => {
  let socket: Socket;

  beforeEach(async () => {
    jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {
      return;
    });
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the service', () => {
    const fixture = TestBed.createComponent(MainPrivateLeftMenuSubComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
