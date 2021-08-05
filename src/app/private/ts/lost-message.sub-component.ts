import { Component, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'lost-message',
  templateUrl: '../html/lost-message.sub-component.html'
})

export class LostMessage {
  @Input() info: any;
  @Output() infoChange:any;
  
  constructor(public user: User, public translate: TranslateService) {
  }
  
  getLostBuildings() {
    let list:any = [];
    
    if(this.info && this.info.lost_build) {
      for(let i in this.info.lost_build) {
        list.push({
          'code': i,
          'nb': this.info.lost_build[i]
        })
      }
    }
    return list;
  }
  
  getLostBuildingsNb() {
    if(this.info && this.info.lost_build) {
      return Object.keys(this.info.lost_build).length;
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
      return Object.keys(this.info.lost_ress).length;
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
