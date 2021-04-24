import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-join-popup',
  templateUrl: '../html/alliance-join-popup.sub-component.html'
})

export class AllianceJoinPopup {
  
  @Input() info:any;
  
  public candidatetext:string;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.candidatetext = '';
  }
  
  allianceJoin() {
    let msg = {
      'alliance': this.info.alliance_id,
      'msg': this.candidatetext
    };
    this.socket.emit('allianceJoin', msg);
  }
}
