import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Tools } from '../../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-attacks-message',
  templateUrl: '../html/attacks-message.sub-component.html'
})

export class AttacksMessageSubComponent {
  @Input() info: any;
  public resources:any;
  
  constructor(public user: User, public translate: TranslateService) {
    this.resources = environment.resources;
  }
  
  
  getLostBuildings() {
    let list = [];
    
    if(this.info.lost_build) {
      for(let code in this.info.lost_build) {
        list.push({
          'code': code,
          'nb': this.info.lost_build[code]
        });
      }
    }
    
    return list;
  }
  
  getSentUnits() {
    let listUnits:any = {};
    let list = []
    
    for(let i in this.info.unitSend) {
      if(!i) {
        continue
      }
      
      listUnits = Tools.addToObject(listUnits, this.info.unitSend[i]);
    }
    
    for(let i in listUnits) {
      if(listUnits[i] > 0) {
        list.push({
          'code': i,
          'nb': listUnits[i]
        });
      }
    }
    
    return list;
  }
  
  getAttackLost() {
    let listUnits:any = {};
    let list = []
    
    for(let i in this.info.lost_wall_unit) {
      if(!i) {
        continue
      }
      
      listUnits = Tools.addToObject(listUnits, this.info.lost_wall_unit[i]);
    }
    for(let i in this.info.unitAttackLost) {
      if(!i) {
        continue
      }
      listUnits = Tools.addToObject(listUnits, this.info.unitAttackLost[i]);
    }
    
    for(let i in listUnits) {
      if(listUnits[i] > 0) {
        list.push({
          'code': i,
          'nb': listUnits[i]
        });
      }
    }
    
    return list;
  }
  
  getDefenseLost() {
    let listUnits:any = {};
    let list = []
    
    for(let i in this.info.unitDefenseLost) {
      if(!i) {
        continue
      }
      listUnits = Tools.addToObject(listUnits, this.info.unitDefenseLost[i]);
    }
    
    for(let i in listUnits) {
      if(listUnits[i] > 0) {
        list.push({
          'code': i,
          'nb': listUnits[i]
        });
      }
    }
    
    return list;
  }
  
  hasCorruptedRes() {
    if(this.info.sanctuary2 && this.info.sanctuary2.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
