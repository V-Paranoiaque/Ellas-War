import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-alliance-emergency-popup',
  templateUrl: './alliance-emergency-popup.sub-component.html',
  imports: [TranslateModule],
})
export class AllianceEmergencyPopupSubComponent {
  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  myAllianceEmergencyExit() {
    this.socket.emit('myAllianceEmergencyExit');
  }
  myAllianceEmergencyExitCancel() {
    this.socket.emit('myAllianceEmergencyExitCancel');
  }
}
