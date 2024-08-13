import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-alliance-evict-popup',
  templateUrl: './alliance-evict-popup.sub-component.html',
})
export class AllianceEvictPopupSubComponent {
  @Input() info!: {
    membre_id: number;
    username: string;
    level: number;
    allow_eject: number;
  };

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  memberEject() {
    this.socket.emit('myAllianceEject', this.info.membre_id);
  }

  possible() {
    return (
      this.user.getPropertyNb('recruiter') > 0 && this.info.allow_eject === 1
    );
  }
}
