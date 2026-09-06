import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { AgoraComponent } from './agora.component';
import { environment } from '../../environments/environment';

describe('AgoraComponent', () => {
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
    const fixture = TestBed.createComponent(AgoraComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('run functions', () => {
    const fixture = TestBed.createComponent(AgoraComponent);
    const app = fixture.componentInstance;

    app.isAnonymous = true;
    app.sell();
    app.isAnonymous = false;
    app.sell();

    app.selectBatch(app.selectedBatch);

    app.selectAgoraRes(1);

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
