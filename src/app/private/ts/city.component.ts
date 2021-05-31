import { Component, Output  } from '@angular/core';
import { EwIcon } from '../../../services/ew-icon.service';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import cloud from '@iconify/icons-fa-solid/cloud';
import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  templateUrl: '../html/city.component.html',
  styleUrls: ['../css/city.component.css']
})

export class City {

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
  
  //Icons
  cloud = cloud;
  EwIcon = EwIcon;
  questionCircle = questionCircle;
  
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
    
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.selectTreasure();
    this.socket.on('divineBonus', (data:any) => {
      this.divineBonusNb = data.nb;
      if(this.divineBonusNb > 0) {
        this.divineBonus   = data.list;
      }
      else {
        this.divineBonus = [];
      }
    });
    
    this.socket.on('dailyCo', (result:any) => {
      this.dailyCo = result;
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
    
    this.socket.emit('divineBonus');
    this.socket.emit('dailyCoCheck');
  }
  
  ngOnDestroy() {
    this.socket.removeListener('divineBonus');
    this.socket.removeListener('dailyCo');
    this.socket.removeListener('dailyCoCheck');
  }
  
  armyDisplay(info:any) {
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
    
    let array_goal:any = {
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
      '3_5': 'camp_level',
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
    
    if(array_goal[quest] && array_goal[quest] == name) {
      return true;
    }
    
    return false;
  }
  
  selectArmy(name:string) {
    this.armyInfo = this.user.info.datas.army[name];
    this.armyInfo.engageNb   = '';
    this.armyInfo.liberatenb = '';
    this.armyInfo.resale     = {};
    this.armyInfo.rEngageNb      = 0;
    this.armyInfo.rLiberateNb    = 0;
    this.armyInfo.rEngagePossible= 0;
    this.armyInfo.error          = 0; 
    
    this.socket.emit('engagePossible', name);
    
    for(let res in this.armyInfo.cost) {
      this.armyInfo.resale[res] = this.armyInfo.cost[res]*0.6;
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
  }
  selectTreasure() {
    this.treasureInfo = {
      'amount': '',
      'treasureMode': 0
    }
  }
}
