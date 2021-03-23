import { Component, Output  } from '@angular/core';
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
    });
    this.socket.on("dailyCoCheck", (r:number) => {
      this.dailyCoCheck = r;
      if(r == 1) {
        this.socket.emit('dailyCo');
        let element:HTMLElement = document.getElementById('DailyCoCheckOpen') as HTMLElement;
        element.click();
      }
    });
    
    setTimeout(() => {
      this.socket.emit('divineBonus');
      this.socket.emit('dailyCoCheck');
    }, 0);
  }
  
  ngOnDestroy() {
    this.socket.removeListener('divineBonus');
    this.socket.removeListener('dailyCo');
    this.socket.removeListener('dailyCoCheck');
  }
  
  divineBonusReset() {
    this.divinBonusListSelected.error = 0;
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
