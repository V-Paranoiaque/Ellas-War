import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { OptionsComponent } from './options.component';
import { environment } from '../../environments/environment';

describe('OptionsComponent', () => {
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
    const fixture = TestBed.createComponent(OptionsComponent);
    const app = fixture.componentInstance;

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should create the service, level >= 1', () => {
    const fixture = TestBed.createComponent(OptionsComponent);
    const app = fixture.componentInstance;
    app.user.setUser({ level: 1 });

    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('Test accountEmail()', () => {
    const fixture = TestBed.createComponent(OptionsComponent);
    const app = fixture.componentInstance;
    app.accountEmail();

    fixture.detectChanges();
    expect(app.emailError).toEqual(1);

    app.newEmail = 'newmail';
    app.accountEmail();

    fixture.detectChanges();
    expect(app.emailError).toEqual(0);
  });
});
