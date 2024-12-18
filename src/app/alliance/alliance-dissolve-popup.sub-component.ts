import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-alliance-dissolve-popup',
  templateUrl: './alliance-dissolve-popup.sub-component.html',
  imports: [TranslateModule],
})
export class AllianceDissolvePopupSubComponent {
  constructor(
    private router: Router,
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  myAllianceDissolve() {
    this.socket.emit('myAllianceDissolve');
    void this.router.navigate(['/diplomacy']);
  }
}
