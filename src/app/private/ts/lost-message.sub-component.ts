import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';

@Component({
  selector: 'app-lost-message',
  templateUrl: '../html/lost-message.sub-component.html'
})

export class LostMessageSubComponent {
  @Input() info: any;

  Tools = Tools;
  
  constructor(public user: User, public translate: TranslateService) {
  }
  
  getLostBuildings() {
    let list:any = [];
    
    if(this.info && this.info.lost_build) {
      for(let i in this.info.lost_build) {
        if(this.info.lost_build[i] > 0) {
          list.push({
            'code': i,
            'nb': this.info.lost_build[i]
          })
        }
      }
    }
    return list;
  }
  
  getLostBuildingsNb() {
    if(this.info && this.info.lost_build) {
      let i =0;
      for(const [_index, qtt] of Object.entries(this.info.lost_build)) {
        if(parseFloat(qtt as string) > 0) {
          i++;
        }
      }
      return i;
    }
    else {
      return 0;
    }
  }
  
  getLostResources() {
    let list:any = [];
    
    if(this.info && this.info.lost_ress) {
      for(let i in this.info.lost_ress) {
        if(this.info.lost_ress[i] > 0) {
          list.push({
            'code': i,
            'nb': this.info.lost_ress[i]
          })
        }
      }
    }
    return list;
  }
  
  getLostResourcesNb() {
    if(this.info && this.info.lost_ress) {
      let i =0;
      for(const [_index, qtt] of Object.entries(this.info.lost_ress)) {
        if(parseFloat(qtt as string) > 0) {
          i++;
        }
      }
      return i;
    }
    else {
      return 0;
    }
  }
  
  getLostUnits() {
    let list:any = [];
    
    if(this.info && this.info.lost_unit) {
      for(let i in this.info.lost_unit) {
        if(this.info.lost_unit[i] > 0) {
          list.push({
            'code': i,
            'nb': this.info.lost_unit[i]
          })
        }
      }
    }
    return list;
  }
  getLostUnitsNb() {
    if(this.info && this.info.lost_unit) {
      return Object.keys(this.info.lost_unit).length;
    }
    else {
      return 0;
    }
  }
}
