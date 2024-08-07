import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import { AttacksSeabattlesComponent } from './attacks-seabattles.component';

@Component({
  selector: 'app-attacks-seabattles-engage-popup',
  templateUrl: './attacks-seabattles-engage-popup.sub-component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
})
export class AttacksSeabattlesEngagePopupSubComponent extends AttacksSeabattlesComponent {
  @Input() case!: {
    case_type: number;
    can_engage: number;
    color_id: number;
    username: string;
    x: number;
    y: number;
    bireme: number;
    trireme: number;
    quadrireme: number;
    leviathan: number;
  };
  @Input() unit!: {
    name: string;
    code: string;
    attack: number;
    defense: number;
    cost: number;
  };

  constructor(
    protected override socket: Socket,
    public override user: User,
    public override translate: TranslateService
  ) {
    super(socket, user, translate);
  }

  engage() {
    this.socket.emit('sbEngage', {
      map_id: this.sbData.sb_id,
      x: this.case.x,
      y: this.case.y,
      unit_name: this.unit.code,
      nb: 1,
    });
  }
}
