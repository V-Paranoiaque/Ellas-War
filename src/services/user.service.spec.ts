import { TestBed } from '@angular/core/testing';
import { OAuthModule, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Socket } from '../services/socketio.service';

import { User } from '../services/user.service';

describe('User', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        User,
      ],
      imports: [
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        Socket, OAuthService,
        OAuthLogger,
        UrlHelperService
      ],
    }).compileComponents();
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('test setConfig', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    let object = {};
    app.setConfig(object)
    expect(app.config).toEqual(object);
  });
  
  it('test setUser', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    let object = {};
    app.setUser(object)
    expect(app.info).toEqual(object);
  });
  
  it('test setUserRess', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    let object = {'drachma': 1};
    app.setUserRess(object)
    expect(app.info.drachma).toEqual(object.drachma);
  });
  
  
});
