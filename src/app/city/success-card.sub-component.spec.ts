import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { SuccessCardSubComponent } from './success-card.sub-component';
import { environment } from '../../environments/environment';

describe('SuccessCardSubComponent', () => {
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
    const fixture = TestBed.createComponent(SuccessCardSubComponent);
    const app = fixture.componentInstance;
    app.title = 'success';
    app.text = 'description';
    app.currently = '0';
    app.point = '0';

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
