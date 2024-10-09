import { Component, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { SocketComponent as Socket } from './socketio.service';
import { ToolsComponent as Tools } from './tools.service';

declare let device: {
  platform: string;
};

@Component({
  selector: 'app-user',
  template: ` <ng-content></ng-content> `,
})
@Injectable()
export class UserComponent {
  init: number;
  info: object;
  config = {
    fb_page: '',
    locale: '',
    url: '',
    weather: 'sun',
  };
  newMsg: number;

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private socket: Socket
  ) {
    this.init = 0;
    this.info = {
      language: environment.language.default,
      datas: {
        alliance: { create: 0 },
        attack: {
          bonus: [],
        },
        building: [],
        honor: {
          rewards: [],
        },
        ress_lvl: {},
        war: { minmembers: 0 },
        sea_battles: {
          units: {
            bireme: {
              attack: 5,
              defense: 6,
              cost: 2,
            },
            trireme: {
              attack: 15,
              defense: 22,
              cost: 5,
            },
            quadrireme: {
              attack: 25,
              defense: 10,
              cost: 8,
            },
            leviathan: {
              attack: 45,
              defense: 75,
              cost: 20,
            },
          },
          towers: {
            oxybeles: {
              attack: 0,
              defense: 250,
              cost: 0,
            },
          },
        },
        max_actions: 0,
        coins_start: 0,
      },
    };
    this.newMsg = 0;
  }

  setInit() {
    this.init = 1;
  }

  getInit() {
    return this.init;
  }

  setConfig(data: object) {
    this.config = data as typeof this.config;
  }

  getConfig() {
    return this.config;
  }

  setUser(user: object) {
    this.info = user;
  }
  setUserRess(ress: object) {
    for (const i in ress) {
      (this.info[i as keyof typeof this.info] as number) =
        ress[i as keyof typeof ress];
    }
  }

  getProperty(name: string): string | object {
    if (Object.hasOwn(this.info, name)) {
      return this.info[name as keyof typeof this.info];
    } else {
      return '';
    }
  }

  getPropertyNb(name: string): number {
    if (Object.hasOwn(this.info, name)) {
      return this.info[name as keyof typeof this.info];
    } else {
      return 0;
    }
  }

  setProperty(prop: string, value: number | string | object) {
    Object.defineProperty(this.info, prop, {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }

  getDatas() {
    return this.getProperty('datas') as {
      army: {
        amazon: {
          nbmax: number;
        };
        automaton: {
          nbmax: number;
        };
        centaur: {
          nbmax: number;
        };
        gaia: {
          attack: number;
          defense: number;
          nbmax: number;
        };
      };
      attack: {
        level_xp_min: number;
        bonus: number;
      };
      building: {
        academy: {
          cost: object;
        };
        archerschool: {
          cost: object;
        };
        cavalryschool: {
          cost: object;
        };
      };
      maxField: number;
      poseidon_wall: {
        water: number;
        marble: number;
        gold: number;
      };
      ress_lvl: {
        ambrosia: number;
        stone: number;
        marble: number;
        grapes: number;
      };
      honor: {
        rewards: number[];
      };
      storeroom_min: number;
      temples: {
        temple1: {
          field: number;
        };
        temple2: {
          field: number;
        };
        temple3: {
          field: number;
        };
        temple4: {
          field: number;
        };
      };
      trade: object;
      weather_cost: object;
      sea_battles: {
        units: {
          bireme: {
            attack: number;
            defense: number;
            cost: number;
          };
          trireme: {
            attack: number;
            defense: number;
            cost: number;
          };
          quadrireme: {
            attack: number;
            defense: number;
            cost: number;
          };
          leviathan: {
            attack: number;
            defense: number;
            cost: number;
          };
        };
        towers: {
          oxybeles: {
            attack: number;
            defense: number;
            cost: number;
          };
        };
        max_actions: number;
        coins_start: number;
      };
    };
  }

  getArmy() {
    const list: {
      code: string;
      lvlmini: number;
      consumption: object;
      attack: number;
      defense: number;
      type: number;
    }[] = [];
    const datas = this.getProperty('datas') as { army: object };
    for (const i in datas.army) {
      const army = datas.army[i as keyof typeof datas.army] as {
        code: string;
        lvlmini: number;
        consumption: object;
        attack: number;
        defense: number;
        type: number;
      };
      //Only if we have the required level or if we have the unit
      if (
        this.getPropertyNb('level') >= army.lvlmini ||
        this.getPropertyNb(i) > 0
      ) {
        army.code = i;
        list.push(army);
      }
    }

    return list;
  }
  getBuildings() {
    const list: {
      code: string;
      lvlmini: number;
      production: object;
      consumption: object;
      type: number;
      field: number;
      defense: number;
    }[] = [];
    const datas = this.getProperty('datas') as { building: object };
    for (const i in datas.building) {
      const building = datas.building[i as keyof typeof datas.building] as {
        code: string;
        lvlmini: number;
        production: object;
        consumption: object;
        type: number;
        field: number;
        defense: number;
      };
      //Only if we have the required level
      if (this.getPropertyNb('level') >= building.lvlmini) {
        building.code = i;
        list.push(building);
      }
    }

    return list;
  }

  reload() {
    const currentUrl = this.router.url;
    void this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        void this.router.navigate([currentUrl]);
      });
  }

  buildTemple1Allowed() {
    return (
      this.getPropertyNb('hermes') +
      this.getPropertyNb('apollo') +
      this.getPropertyNb('demeter')
    );
  }
  buildTemple2Allowed() {
    if (this.getPropertyNb('level') < 6) {
      return 1;
    }
    return this.getPropertyNb('ares') + this.getPropertyNb('athena');
  }
  buildTemple3Allowed() {
    if (this.getPropertyNb('level') < 8) {
      return 1;
    }
    return (
      this.getPropertyNb('artemis') +
      this.getPropertyNb('dionysus') +
      this.getPropertyNb('hephaestus')
    );
  }
  buildTemple4Allowed() {
    if (this.getPropertyNb('level') < 10) {
      return 1;
    }
    return (
      this.getPropertyNb('zeus') +
      this.getPropertyNb('hades') +
      this.getPropertyNb('poseidon')
    );
  }

  //Check permissions for the user
  checkPermissions(status: number[]) {
    //Not received the info yet
    if (this.init === 0) {
      return;
    }
    if (!status.includes(this.getPropertyNb('mstatus'))) {
      void this.router.navigate(['/']);
    }
  }

  hasTemples() {
    return (
      this.getPropertyNb('zeus') +
      this.getPropertyNb('hades') +
      this.getPropertyNb('poseidon')
    );
  }

  getGoalDaysNb() {
    let nb;
    const cDay = this.getPropertyNb('nbdays') % 100;

    if (cDay < 3) {
      nb = 3;
    } else if (cDay < 7) {
      nb = 7;
    } else if (cDay < 14) {
      nb = 14;
    } else if (cDay < 30) {
      nb = 30;
    } else if (cDay < 50) {
      nb = 50;
    } else if (cDay < 70) {
      nb = 70;
    } else if (cDay === 99) {
      nb = 3;
    } else {
      nb = 99;
    }

    return nb;
  }

  getGoalDays() {
    let cDay = this.getPropertyNb('nbdays') % 100;
    const nb = this.getGoalDaysNb();
    if (cDay === 99) {
      cDay = -1;
    }
    return nb - cDay + this.getPropertyNb('nbdays');
  }

  getQuestMax() {
    switch (this.getPropertyNb('level')) {
      case 0:
        return 15;
      case 1:
        return 14;
      case 2:
        return 12;
      case 3:
        return 9;
      case 4:
        return 10;
      case 5:
        return 7;
      case 6:
        return 8;
      case 7:
        return 7;
      case 8:
        return 10;
      case 9:
        return 18;
    }

    return 0;
  }

  hasLevelRess(ress: string) {
    const datas = this.getProperty('datas') as { ress_lvl?: object };

    if (
      datas.ress_lvl &&
      this.getPropertyNb('level') >=
        datas.ress_lvl[ress as keyof typeof datas.ress_lvl]
    ) {
      return true;
    } else {
      return false;
    }
  }

  disconnect() {
    const localToken = localStorage.getItem('token');
    localStorage.removeItem('token');
    this.socket.emit('deconnection', {
      token: localToken,
      extra: this.getExtra(),
    });

    this.setProperty('id', 0);
    this.setProperty('mstatus', 0);

    void this.router.navigate(['/']);
  }

  getExtra() {
    return {
      mobile: environment.mobile,
      invite: localStorage.getItem('invite') ?? 0,
    };
  }

  getLevelRess(ress: string) {
    const datas = this.getProperty('datas') as { ress_lvl: object };

    if (datas.ress_lvl[ress as keyof typeof datas.ress_lvl]) {
      return datas.ress_lvl[ress as keyof typeof datas.ress_lvl];
    } else {
      return 0;
    }
  }

  getSanctuary(sanctuary: number) {
    const list = this.getProperty('sanctuary');

    if (list[sanctuary as keyof typeof list]) {
      const info = list[sanctuary as keyof typeof list] as {
        sanctuaries_id: number;
      };
      return info.sanctuaries_id;
    } else {
      return 0;
    }
  }

  getTaxes(ress: string) {
    return this.getPropertyNb('tax_' + ress);
  }

  getVarRess(ress: string) {
    const var_ress = this.getProperty('var_ress');
    if (var_ress[ress as keyof typeof var_ress]) {
      return var_ress[ress as keyof typeof var_ress];
    } else {
      return 0;
    }
  }

  hasRes(res: string, quantity: number) {
    if (this.getPropertyNb(res) >= quantity) {
      return 1;
    }
    return 0;
  }

  setNewMsg(nb: number) {
    const previous = this.newMsg;
    this.newMsg = nb;

    if (previous >= this.newMsg) {
      return 0;
    } else {
      return 1;
    }
  }

  getNewMsg() {
    return this.newMsg;
  }

  oauthGoogle() {
    if (environment.mobile == 0) {
      this.oauthService.initImplicitFlow();
    }
    //Native Cordova plugin
    else if (device.platform == 'Android' || device.platform == 'iOS') {
      const plugins = window['plugins' as keyof typeof window];
      plugins.googleplus.login(
        {
          scopes: 'profile email',
          webClientId: environment.google.client_id,
        },
        (obj: { idToken: string }) => {
          this.socket.emit('mobileGoogle', {
            token: obj.idToken,
            extra: this.getExtra(),
          });
        },
        (msg: Error) => {
          alert('error: ' + msg.toString());
        }
      );
    } else {
      this.socket.emit('oauth2Server', {
        extra: this.getExtra(),
      });
    }
  }

  getDatasAlliance() {
    return this.getProperty('datas') as {
      alliance: { create: number };
      war: { minmembers: number };
    };
  }

  questValidateAuto() {
    this.socket.emit('questValidateAuto');
  }

  getSBUnits() {
    const list: {
      attack: number;
      defense: number;
      cost: number;
      code: string;
    }[] = [];
    for (const [code, unit] of Object.entries(
      this.getDatas().sea_battles.units
    )) {
      list.push({
        ...unit,
        ...{
          code: code,
          name: Tools.getName(code),
        },
      });
    }
    return list;
  }
  getSBTowers() {
    const list: {
      attack: number;
      defense: number;
      cost: number;
      code: string;
    }[] = [];
    for (const [code, tower] of Object.entries(
      this.getDatas().sea_battles.towers
    )) {
      list.push({
        ...tower,
        ...{
          code: code,
          name: Tools.getName(code),
        },
      });
    }
    return list;
  }
}
