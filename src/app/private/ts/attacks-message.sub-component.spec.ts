import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { IconModule } from '@visurel/iconify-angular';
import { FormBuilder } from '@angular/forms';

import { MenuComponent } from '../../menu/menu.component';
import { AttacksMessageSubComponent } from './attacks-message.sub-component';
import { environment } from '../../../environments/environment';

describe('AttacksMessageSubComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        AttacksMessageSubComponent,
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
  
  it('should create the service without lost_build', () => {
    const fixture = TestBed.createComponent(AttacksMessageSubComponent);
    const app = fixture.componentInstance;
    app.info = {
      'lost_wall_unit': {
        '':'',
        'spartan': 1,
        'mymidon': 0
      },
      'unitSend': {
        '':'',
        'spartan': 1,
        'mymidon': 0
      },
      'unitAttackLost': {
        '':'',
        'spartan': 1,
        'mymidon': 0
      },
      'unitDefenseLost': {
        'spartan': 1,
        'mymidon': 0
      }
    };
    
    app.user.info.datas.building = {
      'mint': {'name': 'Mint', 'names': 'Mints'},
      'palace': {'name': 'Palace', 'names': 'Palaces'}
    };
    app.user.info.datas.army = {
      'mymidon': {'name': 'Mymidon', 'names': 'Mymidons'},
      'spartan': {'name': 'Spartan', 'names': 'Spartans'}
    };
    
    app.getSentUnits();
    app.getLostStoreroom();
    app.getLostBuildings();
    app.getAttackLost();
    app.getDefenseLost();
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('should create the service with lost_build', () => {
    const fixture = TestBed.createComponent(AttacksMessageSubComponent);
    const app = fixture.componentInstance;
    app.info = {
      'lost_build': {
        'mint': 1,
        'palace': 0
      },
      'lost_wall_unit': {
        '':'',
        'spartan': 1,
        'mymidon': 0
      },
      'unitSend':[null, {
          'spartan': 1,
          'mymidon': 0
        }
      ],
      'unitAttackLost': [null, {
          'spartan': 1,
          'mymidon': 0
        }
      ],
      'unitDefenseLost': [null, {
          'spartan': 1,
          'mymidon': 0
        }
      ],
      'lost_storeroom': {
        'drachma': 1,
        'wood': 0
      }
    };
    
    app.user.info.datas.building = {
      'mint': {'name': 'Mint', 'names': 'Mints'},
      'palace': {'name': 'Palace', 'names': 'Palaces'}
    };
    app.user.info.datas.army = {
      'mymidon': {'name': 'Mymidon', 'names': 'Mymidons'},
      'spartan': {'name': 'Spartan', 'names': 'Spartans'}
    };
    
    fixture.detectChanges();
    
    expect(app.getSentUnits()).toEqual([{'code': 'spartan', 'nb': 1}]);
    
    app.getLostBuildings();
    app.getLostStoreroom();
    app.getAttackLost();
    
    expect(app.getDefenseLost()).toEqual([{'code': 'spartan', 'nb': 1}]);
  });
  
  it('test hasCorruptedRes', () => {
    const fixture = TestBed.createComponent(AttacksMessageSubComponent);
    const app = fixture.componentInstance;
    
    app.info = {
      'lost_build': {
      },
      'lost_wall_unit': {
      },
      'unitSend': {
      },
      'unitDefenseLost': {
      },
      'sanctuary2': ['fakesanctuary']
    };
    
    fixture.detectChanges();
    expect(app.hasCorruptedRes()).toBeTrue();
  });
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
