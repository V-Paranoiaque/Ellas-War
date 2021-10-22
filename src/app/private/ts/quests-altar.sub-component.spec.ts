import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IconModule } from '@visurel/iconify-angular';
import { FormBuilder } from '@angular/forms';

import { MenuComponent } from '../../menu/menu.component';
import { QuestsAltarSubComponent } from './quests-altar.sub-component';
import { environment } from '../../../environments/environment';

describe('QuestsAltarSubComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        QuestsAltarSubComponent,
      ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }),
        OAuthModule.forRoot(),
        HttpClientTestingModule,
        IconModule,
      ],
      providers: [
        Socket, User, OAuthService,
        BsModalService, FormBuilder
      ],
    }).compileComponents();
    socket = TestBed.inject(Socket);
    socket.setupSocketConnection(environment.SERVER_DEV);
  });
  
  it('should create the service', () => {
    const fixture = TestBed.createComponent(QuestsAltarSubComponent);
    const app = fixture.componentInstance;
    
    app.user.info.datas.altars = {
      'test': {
        'drachma': 1
      }
    }
    
    app.code = 'test';
    app.condition = 'test';
    app.id = 'test';
    app.title = 'test';
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test altarValidate', () => {
    const fixture = TestBed.createComponent(QuestsAltarSubComponent);
    const app = fixture.componentInstance;
    
    app.user.info.datas.altars = {
      'test': {
        'drachma': 1
      }
    }
    app.altarValidate(0);
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test canGet not enought', () => {
    const fixture = TestBed.createComponent(QuestsAltarSubComponent);
    const app = fixture.componentInstance;
    
    app.code = 'test';
    app.user.info = {
      'drachma': 1,
      'datas': {
        'altars': {
          'test': {
            'drachma': 10
          }
        }
      }
    };
    app.canGet();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('test canGet enought', () => {
    const fixture = TestBed.createComponent(QuestsAltarSubComponent);
    const app = fixture.componentInstance;
    
    app.code = 'test';
    app.user.info = {
      'drachma': 5000,
      'datas': {
        'altars': {
          'test': {
            'drachma': 10
          }
        }
      }
    };
    app.canGet();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
