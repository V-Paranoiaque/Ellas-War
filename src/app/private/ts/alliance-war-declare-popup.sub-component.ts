import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-war-declare-popup',
  templateUrl: '../html/alliance-war-declare-popup.sub-component.html'
})

export class AllianceWarDeclarePopup {
  
  @Input() info:any;
  
  public started:number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.started = 0;
  }
  
  allianceWar() {
    this.started = 1;
    this.socket.emit('allianceWar', this.info.alliance_id);
  }
  
  warPossible() {
    if(this.info.war == 1 && this.started == 0) {
      return true;
    }
    
    return false;
  }
}
