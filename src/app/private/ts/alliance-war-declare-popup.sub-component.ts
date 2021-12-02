import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-war-declare-popup',
  templateUrl: '../html/alliance-war-declare-popup.sub-component.html'
})

export class AllianceWarDeclarePopupSubComponent {
  
  @Input() info:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  allianceWar() {
    this.info.started = 1;
    this.socket.emit('allianceWar', this.info.alliance_id);
  }
  
  warPossible() {
    if(this.info.war == 1 && this.info.started == 0) {
      return true;
    }
    
    return false;
  }
}
