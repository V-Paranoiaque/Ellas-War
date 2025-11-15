import { RouterModule } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { SocketComponent as Socket } from 'src/services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from 'src/services/user.service';
import { ToolsComponent as Tools } from 'src/services/tools.service';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';

import { ArmyHelpPopupSubComponent } from './army-help-popup.sub-component';
import { ArmyPopupSubComponent } from './army-popup.sub-component';
import { ArmySummaryPopupSubComponent } from './army-summary-popup.sub-component';
import { ConstructionPopupSubComponent } from './construction-popup.sub-component';
import { ConstructionSummaryPopupSubComponent } from './construction-summary-popup.sub-component';
import { DailyPopupSubComponent } from './daily-popup.sub-component';
import { DefenseEmptyPopupSubComponent } from './defense-empty-popup.sub-component';
import { DefenseWallPopupSubComponent } from './defense-wall-popup.sub-component';
import { DivineBonusHelpPopupSubComponent } from './divinebonus-help-popup.sub-component';
import { DivineBonusInfoPopupSubComponent } from './divinebonus-info-popup.sub-component';
import { DivineBonusListPopupSubComponent } from './divinebonus-list-popup.sub-component';
import { FirstInfoPopupSubComponent } from './first-info-popup.sub-component';
import { SuccessHelpPopupSubComponent } from './success-help-popup.sub-component';
import { SuccessInfoPopupSubComponent } from './success-info-popup.sub-component';
import { TempleChangeInfoPopupSubComponent } from './temple-change-info-popup.sub-component';
import { TempleHelpPopupSubComponent } from './temple-help-popup.sub-component';
import { TempleInfoPopupSubComponent } from './temple-info-popup.sub-component';
import { Temple1PopupSubComponent } from './temple1-popup.sub-component';
import { Temple2PopupSubComponent } from './temple2-popup.sub-component';
import { Temple3PopupSubComponent } from './temple3-popup.sub-component';
import { Temple4PopupSubComponent } from './temple4-popup.sub-component';
import { TreasurePopupSubComponent } from './treasure-popup.sub-component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { QuestsIncludeComponent } from '../quests/quests-include.component';

import cloud from '@iconify/icons-fa6-solid/cloud';
import cog from '@iconify/icons-fa6-solid/gear';
import discordIcon from '@iconify-icons/logos/discord-icon';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import roundStar from '@iconify/icons-ic/round-star';
import swordCross from '@iconify/icons-mdi/sword-cross';
import waterWave from '@iconify/icons-emojione-monotone/water-wave';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  imports: [
    ArmyHelpPopupSubComponent,
    ArmyPopupSubComponent,
    ArmySummaryPopupSubComponent,
    ConstructionPopupSubComponent,
    ConstructionSummaryPopupSubComponent,
    DailyPopupSubComponent,
    DefenseEmptyPopupSubComponent,
    DefenseWallPopupSubComponent,
    DivineBonusHelpPopupSubComponent,
    DivineBonusInfoPopupSubComponent,
    DivineBonusListPopupSubComponent,
    FirstInfoPopupSubComponent,
    SuccessHelpPopupSubComponent,
    SuccessInfoPopupSubComponent,
    TempleChangeInfoPopupSubComponent,
    TempleHelpPopupSubComponent,
    TempleInfoPopupSubComponent,
    Temple1PopupSubComponent,
    Temple2PopupSubComponent,
    Temple3PopupSubComponent,
    Temple4PopupSubComponent,
    TreasurePopupSubComponent,

    CommonModule,
    EwIconSubComponent,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    QuestsIncludeComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class CityComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  private readonly titleService = inject(Title);

  private subTitle: Subscription;
  buildingInfo = {
    code: 'mint',
    type: 0,
    defense: 0,
    field: 0,
    cost: new Map(),
    destruct: new Map(),
    production: new Map(),
    consumption: new Map(),
    placen: 0,
    placep: 0,
    placec: 0,
    nbmax: 0,
    nbmin: 0,
    buildNb: '',
    destructNb: '',
    rBuildNb: '',
    rDestructNb: '',
    rBuildPossible: 0,
    errorBuilding: 0,
  };
  armyInfo = {
    code: '',
    attack: 0,
    defense: 0,
    type: 0,
    lvlmini: 0,
    rEngageNb: 0,
    rLiberateNb: 0,
    engageNb: '',
    rEngagePossible: 0,
    liberatenb: '',
    free: 0,
    placen: 0,
    placep: 0,
    placec: 0,
    resaler: new Map(),
    resale: 0,
    nbmax: 0,
    temple: {
      artemis: 0,
      hephaestus: 0,
      dionysus: 0,
      ares: 0,
      zeus: 0,
      hades: 0,
    },
    cost: new Map(),
    consumption: new Map(),
    camp_level: 0,
    power: '',
    power_level: 0,
    error: 0,
    building: {
      militarycamp: 0,
    },
    condition: {
      ranking: 0,
    },
  };
  dailyCo = {
    bonus_id: 0,
    msg: 0,
    attack: 0,
    basket: 0,
    basket_small: 0,
    basket_medium: 0,
    basket_large: 0,
  };
  dailyCoCheck = 1;
  displayFavorite = 0;
  divineBonusNb = 0;
  divineBonus: { bonus_id: number; nb: number }[] = [];
  divinBonusSelected = { bonus_id: 0, nb: 0, error: 0 };
  divinBonusListSelected = { error: 0 };
  featsOfStrengthNb = 0;
  success = { selected: 0 };
  templeSelected = {
    id: 0,
    power: 0,
    error: 0,
  };
  treasureInfo = {
    amount: '',
    treasureMode: 0,
  };
  unitFavoriteList = [];
  waveAttackPower = 0;
  waveDefensePower = 1;

  //Icons
  cloud = cloud;
  cog = cog;
  discordIcon = discordIcon;
  questionCircle = questionCircle;
  roundStar = roundStar;
  swordCross = swordCross;
  waterWave = waterWave;

  Object = Object;
  Tools = Tools;
  environment = environment;

  constructor() {
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.selectTreasure();

    if (
      this.user.getPropertyNb('level') === 0 &&
      this.user.getPropertyNb('quest') === 1
    ) {
      setTimeout(() => {
        const element: HTMLElement | null =
          document.getElementById('FirstInfoOpen');
        if (element) {
          element.click();
        }
      }, 500);
    }

    this.ngOnInitSocket();

    this.subTitle = this.translate
      .get('Everything about your city')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnInitSocket() {
    this.socket.on('divineBonus', (data: { nb: number; list: object[] }) => {
      this.divineBonusNb = data.nb;
      if (this.divineBonusNb > 0) {
        this.divineBonus = data.list as typeof this.divineBonus;
      } else {
        this.divineBonus = [];
      }
    });

    this.socket.on('dailyCo', result => {
      this.dailyCo = result as typeof this.dailyCo;

      //Check baskets
      if (this.dailyCo.basket_large > 0) {
        this.dailyCo.basket = 26;
      } else if (this.dailyCo.basket_medium > 0) {
        this.dailyCo.basket = 25;
      } else if (this.dailyCo.basket_small > 0) {
        this.dailyCo.basket = 24;
      } else {
        this.dailyCo.basket = 0;
      }

      const element: HTMLElement | null =
        document.getElementById('DailyCoCheckOpen');
      if (element) {
        element.click();
      }
    });
    this.socket.on('dailyCoCheck', (r: number) => {
      this.dailyCoCheck = r;
      if (r === 1) {
        this.socket.emit('dailyCo');
      }
    });
    this.socket.on('featsOfStrengthNb', nb => {
      this.featsOfStrengthNb = parseInt(nb);
    });

    this.socket.on('unitFavoriteList', data => {
      this.unitFavoriteList = data;
    });
    this.socket.on('unitFavoriteListRefresh', () => {
      this.socket.emit('unitFavoriteList');
    });

    this.socket.on('waveAttackList', (data: { power: number }) => {
      this.waveAttackPower = data.power;
    });
    this.socket.on('waveDefenseList', (data: { power: number }) => {
      this.waveDefensePower = data.power;
    });
    this.socket.on('waveRefresh', () => {
      this.socket.emit('waveAttackList');
      this.socket.emit('waveDefenseList');
    });

    this.socket.emit('divineBonus');
    this.socket.emit('dailyCoCheck');
    this.socket.emit('featsOfStrengthNb');
    this.socket.emit('unitFavoriteList');
    this.socket.emit('waveAttackList');
    this.socket.emit('waveDefenseList');
  }

  ngOnDestroy() {
    this.socket.removeListener('divineBonus');
    this.socket.removeListener('dailyCo');
    this.socket.removeListener('dailyCoCheck');
    this.socket.removeListener('featsOfStrengthNb');
    this.socket.removeListener('unitFavoriteList');
    this.socket.removeListener('unitFavoriteListRefresh');
    this.socket.removeListener('waveAttackList');
    this.socket.removeListener('waveDefenseList');
    this.socket.removeListener('waveRefresh');
    this.subTitle.unsubscribe();
  }

  armyDisplay(paramInfo: object) {
    const info = paramInfo as {
      temple?: object;
      code: string;
      power: string;
      power_level: number;
    };
    if (this.user.getPropertyNb(info.code) > 0) {
      return true;
    }

    //Temple unit
    if (info.temple) {
      for (const temple of Object.keys(info.temple)) {
        if (this.user.getPropertyNb(temple) === 0) {
          return false;
        }
      }
    }

    //Altars
    if (this.user.getPropertyNb(info.power) < info.power_level) {
      return false;
    }

    return true;
  }

  dailCo() {
    return Object.keys(this.dailyCo).length;
  }

  divineBonusReset() {
    this.divinBonusListSelected.error = 0;
  }

  getDivinBonusIcon(id: number) {
    switch (id) {
      case 1:
        return 'ancient-greece';
      case 2:
        return 'menu-city';
      case 3:
        return 'menu-alliance';
      case 5:
        return 'menu-attack';
      case 6:
        return 'smenu-temple';
      case 7:
        return 'feats-of-strength';
    }
    return '';
  }

  levelQuest(name: string) {
    if (this.user.getPropertyNb('quest_validate') === 1) {
      return false;
    }

    const quest =
      this.user.getPropertyNb('level').toString() +
      '_' +
      this.user.getPropertyNb('quest').toString();

    const array_goal = {
      //Level 0
      '0_2': 'mint',
      '0_3': 'ironmine',
      '0_4': 'well',
      '0_5': 'sawmill',
      '0_6': 'ironmine',
      '0_9': 'spartan',
      '0_10': 'watchtower',
      '0_11': 'treasure',
      '0_12': 'mint',
      '0_13': 'watchtower',
      //Level 1
      '1_1': 'silver_man',
      '1_2': 'spy',
      '1_4': 'mint',
      '1_5': 'treasure',
      '1_6': 'hut',
      '1_8': 'farm',
      '1_9': 'mint',
      '1_11': 'treasure',
      //Level 2
      '2_2': 'quarry',
      '2_3': 'mint',
      '2_4': 'treasure',
      '2_6': 'quarry',
      '2_8': 'treasure',
      '2_9': 'militarycamp',
      '2_10': 'peltast',
      '2_11': 'temple1',
      //Level 3
      '3_2': 'observationtower',
      '3_3': 'mint',
      '3_5': 'militarycamp',
      '3_6': 'slinger',
      '3_7': 'observationtower',
      //Level 4
      '4_2': 'growers',
      '4_3': 'shortbow',
      '4_4': 'mint',
      '4_6': 'observationtower',
      '4_7': 'growers',
      '4_9': 'observationtower',
      //Level 5
      '5_1': 'habitation',
      '5_3': 'mint',
      '5_4': 'habitation',
      '5_5': 'longbow',
      //Level 6
      '6_1': 'militarycamp',
      '6_2': 'hippeis',
      '6_4': 'mint',
      '6_5': 'temple2',
      '6_6': 'hippeis',
      //Level 7
      '7_2': 'mountedarchery',
      '7_4': 'mint',
      '7_5': 'mountedarchery',
      //Level 8
      '8_2': 'hoplite',
      '8_3': 'mint',
      '8_5': 'hoplite',
      '8_7': 'mint',
      '8_8': 'temple3',
      //Level 9
      '9_1': 'militarycamp',
      '9_2': 'palace',
      '9_3': 'mountedhoplite',
      '9_4': 'mint',
      '9_5': 'winery',
      '9_6': 'goldmine',
      '9_8': 'mountedhoplite',
      '9_9': 'mint',
      '9_10': 'winery',
      '9_11': 'goldmine',
      '9_13': 'mountedhoplite',
      '9_14': 'mint',
      '9_15': 'winery',
      '9_16': 'goldmine',
    };

    if (
      array_goal[quest as keyof typeof array_goal] &&
      array_goal[quest as keyof typeof array_goal] === name
    ) {
      return true;
    }

    return false;
  }

  selectArmy(name: string) {
    const datas = this.user.getProperty('datas') as object as { army: object };
    this.armyInfo = datas.army[name as keyof typeof datas.army];
    this.armyInfo.engageNb = '';
    this.armyInfo.liberatenb = '';
    this.armyInfo.resaler = new Map();
    this.armyInfo.rEngageNb = 0;
    this.armyInfo.rLiberateNb = 0;
    this.armyInfo.rEngagePossible = 0;
    this.armyInfo.error = 0;
    this.armyInfo.free = 0;

    this.socket.emit('engagePossible', name);
    this.socket.emit('freeUnits', name);

    for (const [res, nb] of Object.entries(this.armyInfo.cost)) {
      this.armyInfo.resaler.set(res, parseFloat(nb as string) * 0.6);
    }
  }
  selectBuilding(name: string) {
    const datas = this.user.getProperty('datas') as object as {
      building: object;
    };
    this.buildingInfo = datas.building[name as keyof typeof datas.building];
    this.buildingInfo.buildNb = '';
    this.buildingInfo.destructNb = '';
    this.buildingInfo.destruct = new Map();
    this.buildingInfo.rBuildNb = '';
    this.buildingInfo.rDestructNb = '';
    this.buildingInfo.rBuildPossible = 0;
    this.buildingInfo.errorBuilding = 0;

    this.socket.emit('buildPossible', name);
    for (const [res, nb] of Object.entries(this.buildingInfo.cost)) {
      this.buildingInfo.destruct.set(res, parseFloat(nb as string) * 0.6);
    }
  }
  selectDivinBonus(bonus: object) {
    this.divinBonusSelected = bonus as typeof this.divinBonusSelected;
    this.divinBonusSelected.error = 0;
  }
  selectSuccess(id: number) {
    this.success.selected = id;

    this.socket.emit('hfNext');
    this.socket.emit('statsPlayer');
  }
  selectTemples(id: number) {
    this.templeSelected = {
      id: id,
      power: 0,
      error: 0,
    };
    this.socket.emit('myAttacksList');
    this.socket.emit('attackStats');
  }
  selectTreasure() {
    this.treasureInfo = {
      amount: '',
      treasureMode: 0,
    };
  }

  flipDisplayFavorite() {
    this.displayFavorite = (this.displayFavorite + 1) % 2;
  }

  nbTemples() {
    return (
      this.user.getPropertyNb('hermes') +
      this.user.getPropertyNb('apollo') +
      this.user.getPropertyNb('demeter') +
      this.user.getPropertyNb('ares') +
      this.user.getPropertyNb('athena') +
      this.user.getPropertyNb('artemis') +
      this.user.getPropertyNb('dionysus') +
      this.user.getPropertyNb('hephaestus') +
      this.user.getPropertyNb('zeus') +
      this.user.getPropertyNb('hades') +
      this.user.getPropertyNb('poseidon') +
      1
    );
  }
}
