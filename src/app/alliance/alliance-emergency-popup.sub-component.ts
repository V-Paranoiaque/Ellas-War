import { Component, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-alliance-emergency-popup',
  templateUrl: './alliance-emergency-popup.sub-component.html',
  imports: [TranslateModule],
})
export class AllianceEmergencyPopupSubComponent {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  myAllianceEmergencyExit() {
    this.socket.emit('myAllianceEmergencyExit');
  }
  myAllianceEmergencyExitCancel() {
    this.socket.emit('myAllianceEmergencyExitCancel');
  }
}
