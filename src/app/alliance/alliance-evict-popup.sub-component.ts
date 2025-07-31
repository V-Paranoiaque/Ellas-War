import { Component, Input, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-alliance-evict-popup',
  templateUrl: './alliance-evict-popup.sub-component.html',
  imports: [TranslateModule],
})
export class AllianceEvictPopupSubComponent {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  @Input() info!: {
    membre_id: number;
    username: string;
    level: number;
    allow_eject: number;
  };

  memberEject() {
    this.socket.emit('myAllianceEject', this.info.membre_id);
  }

  possible() {
    return (
      this.user.getPropertyNb('recruiter') > 0 && this.info.allow_eject === 1
    );
  }
}
