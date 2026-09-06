import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { SanctuaryMessageSubComponent } from './sanctuary-message.sub-component';
import { MessageContent } from '../../services/message.class';

import { environment } from '../../environments/environment';

describe('SanctuaryMessageSubComponent', () => {
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
    const msg = new MessageContent();
    const fixture = TestBed.createComponent(SanctuaryMessageSubComponent);
    const app = fixture.componentInstance;
    app.info = msg.content;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
