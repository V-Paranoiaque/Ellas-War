import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-candidate-popup',
  templateUrl: '../html/alliance-candidate-popup.sub-component.html'
})

export class AllianceCandidatePopupSubComponent {
  
  @Input() candidate:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  accept() {
    this.socket.emit('myAllianceAccept', this.candidate.membre_id);
  }
  
  refuse() {
    this.socket.emit('myAllianceRefuse', this.candidate.membre_id);
  }
}
