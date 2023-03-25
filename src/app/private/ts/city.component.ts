import { Component, Output, OnInit, OnDestroy  } from '@angular/core';
import { EwIconSubComponent } from '../../../services/ew-icon.service';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { environment } from './../../../environments/environment';

import cloud from '@iconify/icons-fa-solid/cloud';
import cog from '@iconify/icons-fa-solid/cog';
import discordIcon from '@iconify-icons/logos/discord-icon';
import questionCircle from '@iconify/icons-fa-regular/question-circle';
import swordCross from '@iconify/icons-mdi/sword-cross';
import waterWave from '@iconify/icons-emojione-monotone/water-wave';

@Component({
  templateUrl: '../html/city.component.html',
  styleUrls: ['../css/city.component.css']
})

export class CityComponent implements OnInit, OnDestroy {

  @Output() public armyInfo:any
            public buildingInfo:any
            public dailyCo:any
            public dailyCoCheck:number;
            public divinBonusSelected:any
            public divinBonusListSelected:any;
            public success:any;
            public templeSelected:any;
            public treasureInfo:any;
  
  public divineBonus:any;
  public divineBonusNb:number;
  public waveAttackPower:number;
  public waveDefensePower:number;

  environment = environment;
  Tools = Tools;

  //Icons
  cloud = cloud;
  cog = cog;
  discordIcon = discordIcon;
  EwIcon = EwIconSubComponent;
  questionCircle = questionCircle;
  swordCross = swordCross;
  waterWave = waterWave;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    //We set a default building to avoid errors
    this.buildingInfo = { code: 'mint' };
    this.armyInfo = { code: 'spartan' };
    this.dailyCo = {}
    this.dailyCoCheck = 1;
    this.divineBonusNb = 0;
    this.divineBonus = [];
    this.divinBonusSelected = {'error': 0 };
    this.divinBonusListSelected = {'error': 0 };
    this.success = {'selected': 0};
    this.templeSelected = {
      'id': 0,
      'power': 0,
      'error': 0
    };
    this.waveAttackPower = 0;
    this.waveDefensePower = 0;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.selectTreasure();
    
    if(this.user.getPropertyNb('level') == 0 &&
       this.user.getPropertyNb('quest') == 1) {
      setTimeout(() => {
        let element:HTMLElement = document.getElementById('FirstInfoOpen') as HTMLElement;
        if(element) {
          element.click();
        }
      }, 500);
    }

    this.ngOnInitSocket();
  }
  
  ngOnInitSocket() {
    this.socket.on('divineBonus', (data) => {
      this.divineBonusNb = data.nb;
      if(this.divineBonusNb > 0) {
        this.divineBonus   = data.list;
      }
      else {
        this.divineBonus = [];
      }
    });
    
    this.socket.on('dailyCo', (result) => {
      this.dailyCo = result as typeof this.dailCo;
      //Check baskets
      if(this.dailyCo.basket_large > 0) {
        this.dailyCo.basket = 26
      }
      else if(this.dailyCo.basket_medium > 0) {
        this.dailyCo.basket = 25
      }
      else if(this.dailyCo.basket_small > 0) {
        this.dailyCo.basket = 24
      }
      else {
        this.dailyCo.basket = 0;
      }

      let element:HTMLElement = document.getElementById('DailyCoCheckOpen') as HTMLElement;
      if(element) {
        element.click();
      }
    });
    this.socket.on("dailyCoCheck", (r:number) => {
      this.dailyCoCheck = r;
      if(r == 1) {
        this.socket.emit('dailyCo');
      }
    });
    
    this.socket.on('waveAttackList', (data) => {
        this.waveAttackPower = data.power;
    });
    this.socket.on('waveDefenseList', (data) => {
        this.waveDefensePower = data.power;
    });
    
    this.socket.emit('divineBonus');
    this.socket.emit('dailyCoCheck');
    
    this.socket.emit('waveAttackList');
    this.socket.emit('waveDefenseList');
  }
  
  ngOnDestroy() {
    this.socket.removeListener('divineBonus');
    this.socket.removeListener('dailyCo');
    this.socket.removeListener('dailyCoCheck');
    this.socket.removeListener('waveAttackList');
    this.socket.removeListener('waveDefenseList');
  }
  
  armyDisplay(info:any) {
    if(this.user.getPropertyNb(info.code) > 0) {
      return true;
    }
    
    //Temple unit
    if(info.temple) {
      for(let temple in info.temple) {
        if(this.user.getPropertyNb(temple) == 0) {
          return false;
        }
      }
    }
    
    //Altars
    if(this.user.getPropertyNb(info.power) < info.power_level) {
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
  
  getDivinBonusIcon(id:number) {
    switch(id) {
      case 1: return 'ancient-greece';
      case 2: return 'menu-city';
      case 3: return 'menu-alliance';
      case 5: return 'menu-attack';
      case 6: return 'pegasus';
      case 7: return 'feats-of-strength';
    }
    return '';
  }
  
  levelQuest(name:string) {
    if(this.user.getQuestValidate() == 1) {
      return false;
    }
    
    let quest = this.user.getLevel()+'_'+this.user.getQuest();
    
    let array_goal = {
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
      '9_16': 'goldmine'
    }
    
    if(array_goal[quest as keyof typeof array_goal] && array_goal[quest as keyof typeof array_goal] == name) {
      return true;
    }
    
    return false;
  }
  
  selectArmy(name:string) {
    this.armyInfo = this.user.info.datas.army[name];
    this.armyInfo.engageNb   = '';
    this.armyInfo.liberatenb = '';
    this.armyInfo.resaler    = {};
    this.armyInfo.rEngageNb      = 0;
    this.armyInfo.rLiberateNb    = 0;
    this.armyInfo.rEngagePossible= 0;
    this.armyInfo.error          = 0;
    this.armyInfo.free           = 0;
    
    this.socket.emit('engagePossible', name);
    this.socket.emit('freeUnits', name);
    
    for(let res in this.armyInfo.cost) {
      this.armyInfo.resaler[res] = this.armyInfo.cost[res] *
                                   this.armyInfo.resale;
    }
  }
  selectBuilding(name:string) {
    this.buildingInfo = this.user.info.datas.building[name];
    this.buildingInfo.buildNb    = '';
    this.buildingInfo.destructNb = '';
    this.buildingInfo.destruct   = {};
    this.buildingInfo.rBuildNb       = 0;
    this.buildingInfo.rDestructNb    = 0;
    this.buildingInfo.rBuildPossible = 0;
    this.buildingInfo.errorBuilding  = 0;
    
    this.socket.emit('buildPossible', name);
    
    for(let res in this.buildingInfo.cost) {
      this.buildingInfo.destruct[res] = this.buildingInfo.cost[res]*0.6;
    }
  }
  selectDivinBonus(bonus:any) {
    this.divinBonusSelected = bonus;
    this.divinBonusSelected.error = 0;
  }
  selectSuccess(id:number) {
    this.success.selected = id;
    
    this.socket.emit('hfNext');
    this.socket.emit('statsPlayer');
    
  }
  selectTemples(id:number) {
    this.templeSelected = {
      'id': id,
      'power': 0,
      'error': 0
    };
    this.socket.emit('myAttacksList');
  }
  selectTreasure() {
    this.treasureInfo = {
      'amount': '',
      'treasureMode': 0
    }
  }
}
