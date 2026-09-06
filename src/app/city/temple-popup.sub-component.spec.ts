import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { appConfig } from '../app.config.spec';

import { TemplePopupSubComponent } from './temple-popup.sub-component';
import { environment } from '../../environments/environment';

describe('TemplePopupSubComponent', () => {
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
    const fixture = TestBed.createComponent(TemplePopupSubComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should test the service', () => {
    const fixture = TestBed.createComponent(TemplePopupSubComponent);
    const app = fixture.componentInstance;

    app.setTemple(1);
    app.setTemple(1);

    fixture.detectChanges();
    expect(app.temple).toEqual(0);

    app.price = [{ resource: 'drachma', quantity: 200000 }];
    app.user.setUser({ drachma: 200000 });
    expect(app.canBuild()).toEqual(true);

    app.price = [{ resource: 'drachma', quantity: 200000 }];
    app.user.setUser({ drachma: 1 });
    expect(app.canBuild()).toEqual(false);
  });
});
