import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder } from '@angular/forms';

import { MenuComponent } from '../../menu/menu.component';
import { AdminStatsUnitsComponent } from './admin-stats-units.component';
import { environment } from '../../../environments/environment';

describe('AdminStatsUnitsComponent', () => {
  let socket: Socket;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        MenuComponent,
        AdminStatsUnitsComponent,
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
    const fixture = TestBed.createComponent(AdminStatsUnitsComponent);
    const app = fixture.componentInstance;
    
    app.user.info.datas = {};
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
  it('check fake data', () => {
    const fixture = TestBed.createComponent(AdminStatsUnitsComponent);
    const app = fixture.componentInstance;
    
    //Fake data
    app.user.info.datas = {
      'army': {
        'spy': {'attack': 0},
        'silver_man': {
          'name': 'Silverman',
          'names': 'Silvermen',
          'lvlmini' : 1,
          'attack' : 5,
          'defense': 3,
          'type': 1,
          'placen': 1,
          'cost': {
            'drachma': 80,
            'iron':30
          },
          'resale': 0.6,
          'consumption': {
            'drachma': 6,
            'water': 3,
            'iron': 15
          },
          'saving': 0.05,
          'quest_lvl': {
            '1': {
              '1': 'yes',
              '11': 'yes'
            }
          }
        },
        'elitehoplite': {
          'name': 'Elite hoplite',
          'names' : 'Elite hoplites',
          'lvlmini' : 10,
          'attack' : 54,
          'defense': 54,
          'type': 1,
          'placep': 1,
          'cost': {
            'drachma': 760
          },
          'resale': 0.6,
          'consumption': {
            'drachma': 64,
            'wine': 0.4,
            'iron': 200,
            'gold': 0.2
          },
          'building': {
            'militarycamp': 1
          },
          'camp_level': 4,
          'saving': 0.6
        },
        'spartan': {
          'name': 'Spartan',
          'names': 'Spartans',
          'lvlmini' : 5,
          'attack' : 4.5,
          'defense': 7.5,
          'type': 5,
          'nbmax': 600,
          'cost': {
            'drachma': 1500
          },
          'resale': 0.6,
          'consumption': {
            'water': 50,
            'food': 30,
            'iron': 250
          },
          'temple': {
            'ares': 1
          },
          'saving': 1.5
        },
        'myrmidon': {
          'name': 'Myrmidon',
          'names': 'Myrmidons',
          'lvlmini' : 10,
          'attack' : 210,
          'defense': 150,
          'type': 5,
          'nbmax': 1500,
          'cost': {
            'drachma': 2200
          },
          'resale': 0.6,
          'consumption': {
            'water': 40,
            'food': 25,
            'wine': 1,
            'gold': 0.5
          },
          'temple': {
            'zeus': 1
          },
          'saving': 5
        },
        'soul': {
          'name': 'Tormented soul',
          'names': 'Tormented souls',
          'lvlmini' : 10,
          'attack' : 24,
          'defense': 20,
          'type': 5,
          'nbmax': 5000,
          'cost': {
            'drachma': 400
          },
          'resale': 0.3,
          'temple': {
            'hades': 1
          },
          'saving': 0.1
        },
        'creature': {
          'name': 'Creature of tartar',
          'names': 'Creatures of tartar',
          'lvlmini' : 10,
          'attack' : 480,
          'defense': 9,
          'type': 5,
          'placec': 1,
          'cost': {
            'marble': 50,
            'wine': 15,
            'gold': 30
          },
          'resale': 0.6,
          'consumption': {
            'water': 800,
            'food': 580,
            'iron': 360
          },
          'condition': {
            'ranking': 1
          }
        },
        'toihighlevel': {'attack': 1, 'lvlmini': 11, 'type': 5},
      },
      'building': {
        'habitation': {
          'name': 'Habitation',
          'names': 'Habitations',
          'lvlmini': 4,
          'defense': 700,
          'field': 24,
          'nbmax': 0,
          'type': 3,
          'cost': {
            'drachma': 2500,
            'wood': 750
          },
          'resale': 0.6,
          'placen' : 20,
          'quest_lvl': {
            '4': {
              '3': 'yes'
            },
            '5': {
              '1': 'yes',
              '4': 'yes'
            }
          }
        },
        'palace': {
          'name': 'Palace',
          'names': 'Palaces',
          'lvlmini': 9,
          'defense': 1050,
          'field': 26,
          'nbmax': 0,
          'type': 3,
          'cost': {
            'drachma': 6000,
            'wood': 10000,
            'iron': 2400,
            'stone': 5000
          },
          'resale': 0.6,
          'placep' : 16,
          'quest_lvl': {
            '9': {
              '2': 'yes',
              '3': 'yes',
              '8': 'yes',
              '13': 'yes'
            }
          }
        },
        'cursedcave': {
          'name': 'Cursed cave',
          'names': 'Cursed caves',
          'lvlmini': 10,
          'defense': 6800,
          'field': 36,
          'nbmax': 0,
          'type': 3,
          'cost': {
            'wood': 30000,
            'stone': 8000,
            'marble':400
          },
          'resale': 0.6,
          'placec' : 5
        },
        'watchtower': {
          'name': 'Watchtower',
          'names': 'Watchtowers',
          'lvlmini': 0,
          'attack' : 0,
          'defense': 350,
          'field': 65,
          'nbmax': 0,
          'type': 2,
          'cost': {
            'drachma': 5000,
            'wood': 1200,
            'iron':800
          },
          'resale': 0.6,
          'quest_lvl': {
            '0': {
              '11': 'yes',
              '14': 'yes'
            },
            '1': {
              '11': 'yes'
            }
          }
        },
        'faketower': {
          'name': 'Fake tower',
          'names': 'Fake towers',
          'lvlmini': 0,
          'attack' : 0,
          'defense': 350,
          'field': 65,
          'nbmax': 0,
          'type': 2,
          'cost': {
            'drachma': 50000,
            'wood': 12000,
            'iron':8000
          },
          'consumption': {
            'drachma': 5000,
            'wood': 1200,
            'iron':800
          },
          'resale': 0.6,
          'quest_lvl': {
            '0': {
              '11': 'yes',
              '14': 'yes'
            },
            '1': {
              '11': 'yes'
            }
          }
        },
      }
    };
    
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
  
});

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
