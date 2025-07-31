import { Component, inject } from '@angular/core';
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
  private readonly router = inject(Router);
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  allianceLeave() {
    this.socket.emit('myAllianceLeave');
    void this.router.navigate(['/diplomacy']);
  }
}
