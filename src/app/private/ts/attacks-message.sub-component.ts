import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-attacks-message',
  templateUrl: '../html/attacks-message.sub-component.html',
  styleUrls: ['../css/attacks-message.sub-component.css']
})

export class AttacksMessageSubComponent {
  @Input() info: any;
  public resources:any;
  
  Object = Object;
  Tools = Tools;
  
  constructor(public user: User, public translate: TranslateService) {
    this.resources = environment.resources;
  }
  
  getLostStoreroom() {
    let list = [];
    
    if(this.info.lost_storeroom) {
      for(let code in this.info.lost_storeroom) {
        if(this.info.lost_storeroom[code] > 0) {
          list.push({
            'res_id': code,
            'quantity': this.info.lost_storeroom[code]
          });
        }
      }
    }
    
    return list;
  }
  
  getLostBuildings() {
    let list = [];
    
    if(this.info.lost_build) {
      for(let code in this.info.lost_build) {
        if(!this.user.info.datas.building || this.info.lost_build[code] == 0) {
          continue;
        }
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
  
  getSaved() {
    if(!this.info.saved_attack) {
      return [];
    }
    
    let list = []
    
    for(let i in this.info.saved_attack) {
      if(this.info.saved_attack[i] > 0) {
        list.push({
          'code': i,
          'nb': this.info.saved_attack[i]
        });
      }
    }
    
    return list;
  }

  getSavedRes() {
    let list = [];
    
    if(this.info.ress_def) {
      for(let code in this.info.ress_def) {
        if(this.info.ress_def[code] > 0) {
          list.push({
            'res_id': code,
            'quantity': this.info.ress_def[code]
          });
        }
      }
    }
    
    return list;
  }
  
  getSavedOther() {
    if(!this.info.saved_defense) {
      return 0;
    }
    return this.info.saved_defense;
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
