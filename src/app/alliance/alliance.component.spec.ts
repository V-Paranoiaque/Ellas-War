import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { AllianceComponent } from './alliance.component';
import { environment } from '../../environments/environment';

describe('AllianceComponent', () => {
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
    const fixture = TestBed.createComponent(AllianceComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('run functions', () => {
    const fixture = TestBed.createComponent(AllianceComponent);
    const app = fixture.componentInstance;

    app.getProfile();
    app.setPlayer({ membre_id: 1 }, 1);
    app.setPlayer({ membre_id: 1 }, 2);
    app.setAlliance(app.allianceProfile);

    app.taxesInit();

    app.warSelect({ alliance_attacking: 0, alliance_defender: 0 });

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
