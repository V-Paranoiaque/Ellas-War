import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-emergency-popup',
  templateUrl: '../html/alliance-emergency-popup.sub-component.html'
})

export class AllianceEmergencyPopupSubComponent {
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  myAllianceEmergencyExit() {
    this.socket.emit('myAllianceEmergencyExit');
  }
  myAllianceEmergencyExitCancel() {
    this.socket.emit('myAllianceEmergencyExitCancel');
  }
}
