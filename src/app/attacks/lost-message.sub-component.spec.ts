import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { LostMessageSubComponent } from './lost-message.sub-component';
import { environment } from '../../environments/environment';

describe('LostMessageSubComponent', () => {
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
    const fixture = TestBed.createComponent(LostMessageSubComponent);
    const app = fixture.componentInstance;
    app.info = {
      username: '',
      lost_build: {
        farm: 0,
        growers: 0,
      },
      lost_ress: {},
    } as typeof app.info;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
