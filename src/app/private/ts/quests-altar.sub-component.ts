import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import outlineStars from '@iconify-icons/ic/outline-stars';

@Component({
  selector: 'quests-altar',
  templateUrl: '../html/quests-altar.sub-component.html',
  styleUrls: ['../css/quests-altar.sub-component.css']
})

export class QuestsAltar {
  
  @Input() code:any;
  @Input() condition:any;
  @Input() id:any;
  @Input() title:any;
  
  public altarValidateInfo:any;
  
  outlineStars = outlineStars;
  parseInt = parseInt;
  
  constructor(protected socket: Socket, public user: User, public translate: TranslateService) {
    this.altarValidateInfo = {};
  }
  
  ngOnInit() {
    this.socket.on('altarValidate', (data:any) => {
      this.altarValidateInfo = data;
      
      this.socket.emit('altarConditionDivineunits');
      this.socket.emit('altarConditionPrometheus');
      this.socket.emit('altarConditionHestia');
      this.socket.emit('altarConditionGaia');
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('altarValidate');
  }
  
  altarValidate(id:number) {
    this.socket.emit("altarValidate", id);
  }
  
  canGet() {
    let resList = this.user.info.datas.altars[this.code];
    for(let res in resList) {
      if(this.user.getPropertyNb(res) < resList[res]*(this.user.getPropertyNb(this.code)+1)) {
        return 0
      }
    }
    return 1;
  }
  
  getPrice() {
    let list = [];
    let resList = this.user.info.datas.altars[this.code];
    for(let res in resList) {
      list.push({
        'resource': res,
        'quantity': resList[res]
      })
    }
    return list;
  }
  
  range(a:number, b:number) {
    let list = []
    for(a;a<=b;a++) {
      list.push(a);
    }
    return list;
  }
}
