import { TestBed } from '@angular/core/testing';
import { OAuthModule, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from './socketio.service';

import { UserComponent as User } from './user.service';

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
  
  it('test buildTemple1Allowed', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.buildTemple1Allowed()).toEqual(0);
  });
  it('test buildTemple2Allowed', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.buildTemple2Allowed()).toEqual(1);
    
    app.setUser({'level': 6})
    expect(app.buildTemple2Allowed()).toEqual(0);
  });
  it('test buildTemple3Allowed', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.buildTemple3Allowed()).toEqual(1);
    
    app.setUser({'level': 8})
    expect(app.buildTemple3Allowed()).toEqual(0);
  });
  it('test buildTemple4Allowed', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.buildTemple4Allowed()).toEqual(1);
    
    app.setUser({'level': 10})
    expect(app.buildTemple4Allowed()).toEqual(0);
    
    app.setUser({'level': 10, 'zeus': 1})
    expect(app.buildTemple4Allowed()).toEqual(1);
  });
  
  it('test getArmy', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getArmy()).toEqual([]);
  });
  
  it('test getBuildings', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getBuildings()).toEqual([]);
  });
  
  it('test getDatas', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getDatas()).toEqual({'ress_lvl': 0});
  });
  
  it('test getId', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getId()).toEqual(0);
  });
  
  it('test getLevel', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getLevel()).toEqual(0);
  });
  
  it('test getProperty', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getProperty('style')).toEqual('default');
  });
  
  it('test getPropertyNb', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getPropertyNb('id')).toEqual(0);
  });
  
  it('test getConfig', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getConfig()).toEqual({'weather': 'sun'});
  });
  
  it('test getInit', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getInit()).toEqual(0);
  });
  
  it('test getQuest', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.setUser({'quest': 2})
    expect(app.getQuest()).toEqual(2);
  });
  
  it('test getQuestValidate', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.setUser({'quest_validate': 1})
    expect(app.getQuestValidate()).toEqual(1);
  });
  
  it('test getQuestMax', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.setUser({'level': 0})
    expect(app.getQuestMax()).toEqual(14);
    
    app.setUser({'level': 1})
    expect(app.getQuestMax()).toEqual(14);
    
    app.setUser({'level': 2})
    expect(app.getQuestMax()).toEqual(12);
    
    app.setUser({'level': 3})
    expect(app.getQuestMax()).toEqual(9);
    
    app.setUser({'level': 4})
    expect(app.getQuestMax()).toEqual(10);
    
    app.setUser({'level': 5})
    expect(app.getQuestMax()).toEqual(7);
    
    app.setUser({'level': 6})
    expect(app.getQuestMax()).toEqual(8);
    
    app.setUser({'level': 7})
    expect(app.getQuestMax()).toEqual(7);
    
    app.setUser({'level': 8})
    expect(app.getQuestMax()).toEqual(10);
    
    app.setUser({'level': 9})
    expect(app.getQuestMax()).toEqual(18);
    
    app.setUser({'level': 10})
    expect(app.getQuestMax()).toEqual(0);
  });
  
  it('test getLevelRess', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    
    expect(app.getLevelRess('drachma')).toEqual(0);
  });
  
  it('test getSanctuary', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getSanctuary('random')).toEqual(0);
  });
  
  it('test getTaxes', () => {
    const fixture = TestBed.createComponent(User);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.getTaxes('drachma')).toEqual(0);
  });
  
  
});
