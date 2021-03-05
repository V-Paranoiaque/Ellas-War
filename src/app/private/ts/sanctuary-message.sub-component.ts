import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'sanctuary-message',
  templateUrl: '../html/sanctuary-message.sub-component.html'
})

export class SanctuaryMessage {
  @Input() info: any;

  constructor(public user: User, public translate: TranslateService) {
  }

  
  getSentUnits() {
    let listUnits:any = {};
    let list = []
    
    for(let i in this.info.unitSend) {
      if(i) {
        for(let j in this.info.unitSend[i]) {
          if(!listUnits[j]) {
            listUnits[j] = 0;
          }
          listUnits[j] += this.info.unitSend[i][j];
        }
      }
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
    
    for(let i in this.info.unitAttackLost) {
      if(i) {
        for(let j in this.info.unitAttackLost[i]) {
          if(!listUnits[j]) {
            listUnits[j] = 0;
          }
          listUnits[j] += this.info.unitAttackLost[i][j];
        }
      }
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
      if(i) {
        for(let j in this.info.unitDefenseLost[i]) {
          if(!listUnits[j]) {
            listUnits[j] = 0;
          }
          listUnits[j] += this.info.unitDefenseLost[i][j];
        }
      }
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
  
  getSanctuaryLost() {
    let listUnits:any = {};
    let list = []
    
    for(let i in this.info.sanctuary_lost) {
      if(i) {
        for(let j in this.info.sanctuary_lost[i]) {
          if(!listUnits[j]) {
            listUnits[j] = 0;
          }
          listUnits[j] += this.info.sanctuary_lost[i][j];
        }
      }
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
}
