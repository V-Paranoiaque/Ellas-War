import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-wave-divide-popup',
  templateUrl: '../html/wave-divide-popup.sub-component.html'
})

export class WaveDividePopupSubComponent {
  @Input() info:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    
  }
  
  confirm() {
    if(this.info.strategy == 1) {
      this.socket.emit('waveAttackRemove', {
        'unit': this.info.code,
        'wave': this.info.wave,
        'nb': this.info.nbUnit
      });
    }
    else {
      this.socket.emit('waveDefenseRemove', {
        'unit': this.info.code,
        'wave': this.info.wave,
        'nb': this.info.nbUnit
      });
    }
  }
}
