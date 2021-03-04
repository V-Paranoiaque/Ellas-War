import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'lightning-message',
  templateUrl: '../html/lightning-message.sub-component.html'
})

export class LightningMessage {
  @Input() info: any;

  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  getBuildings() {
    let list = [];
    
    for(let i in this.info.lost_build) {
      list.push({
        'code': i,
        'nb': this.info.lost_build[i]
      })
    }
    
    return list;
  }
}
