import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-alliance-leave-popup',
  templateUrl: './alliance-leave-popup.sub-component.html',
  imports: [TranslateModule],
})
export class AllianceLeavePopupSubComponent {
  constructor(
    private router: Router,
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  allianceLeave() {
    this.socket.emit('myAllianceLeave');
    void this.router.navigate(['/diplomacy']);
  }
}
