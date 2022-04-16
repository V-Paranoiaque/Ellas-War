import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';

@Component({
  selector: 'app-divinebonus-info-popup',
  templateUrl: '../html/divinebonus-info-popup.sub-component.html'
})

export class DivineBonusInfoPopupSubComponent {
  @Input() divineBonus: any;
  
  constructor(private socket: Socket, public translate: TranslateService) {
  }
  
  divineBonusUse() {
    let msg = {
      'bonus_id': this.divineBonus.bonus_id
    };
    
    if(this.divineBonus.nb > 0) {
      this.divineBonus.nb--;
      this.socket.emit('divineBonusUse', msg);
      this.divineBonus.error = 1;
    }
    else {
      this.divineBonus.error = 0;
    }
  }
}
