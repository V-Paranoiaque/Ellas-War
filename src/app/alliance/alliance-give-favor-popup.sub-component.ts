import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-alliance-give-favor-popup',
  templateUrl: './alliance-give-favor-popup.sub-component.html',
})
export class AllianceGiveFavorPopupSubComponent {
  @Input() info!: {
    membre_id: number;
    username: string;
    level: number;
    freereturn: number;
  };
  sent = 0;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  give() {
    this.info.freereturn = 1;
    this.sent = 1;
    this.socket.emit('myAllianceGivePauseFavor', this.info.membre_id);
  }
}
