import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { AdminAlliancesComponent } from './admin-alliances.component';
import { environment } from '../../environments/environment';

describe('AdminAlliancesComponent', () => {
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
    const fixture = TestBed.createComponent(AdminAlliancesComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('test the service', () => {
    const fixture = TestBed.createComponent(AdminAlliancesComponent);
    const app = fixture.componentInstance;

    app.setAlliance(1, 'dummy');
    app.confirmAlliance();

    fixture.detectChanges();
    expect(app.currentAlliance.id).toEqual(1);
  });
});
