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
            public divinBonusSelected:any
            public divinBonusListSelected:any;
            public success:any;
            public templeSelected:any;
  
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
    
    this.socket.socket.on('divineBonus', (data:any) => {
      this.divineBonusNb = data.nb;
      if(this.divineBonusNb > 0) {
        this.divineBonus   = data.list;
      }
      else {
        this.divineBonus = [];
      }
    });
    
    this.socket.socket.on('dailyCo', (result:any) => {
      this.dailyCo = result;
    });
    this.socket.socket.on("dailyCoCheck", (r:number) => {
      if(r == 1) {
        this.socket.emit('dailyCo');
      }
    });
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('divineBonus');
      this.socket.emit('dailyCoCheck');
    }, 0);
  }
  
  divineBonusReset() {
    this.divinBonusListSelected.error = 0;
  }
  
  selectArmy(name:string) {
    this.armyInfo = this.user.info.datas.army[name];
    this.armyInfo.resale = {};
    
    this.socket.emit('engagePossible', name);
    
    for(let res in this.armyInfo.cost) {
      this.armyInfo.resale[res] = this.armyInfo.cost[res]*0.6;
    }
  }
  selectBuilding(name:string) {
    this.buildingInfo = this.user.info.datas.building[name];
    this.buildingInfo.destruct = {};
    
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
}
