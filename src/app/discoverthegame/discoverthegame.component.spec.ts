import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { DiscoverthegameComponent } from './discoverthegame.component';
import { environment } from '../../environments/environment';

describe('DiscoverthegameComponent', () => {
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
    const fixture = TestBed.createComponent(DiscoverthegameComponent);
    const app = fixture.componentInstance;
    app.translate.use('en');

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
