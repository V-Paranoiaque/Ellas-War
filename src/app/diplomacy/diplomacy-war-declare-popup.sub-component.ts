import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-diplomacy-war-declare-popup',
  templateUrl: './diplomacy-war-declare-popup.sub-component.html',
})
export class DiplomacyWarDeclarePopupSubComponent {
  @Input() info!: {
    war: number;
    started: number;
    alliance_name: string;
    alliance_id: number;
  };

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  allianceWar() {
    this.info.started = 1;
    this.socket.emit('allianceWar', this.info.alliance_id);
  }

  warPossible() {
    if (this.info.war === 1 && this.info.started === 0) {
      return true;
    }

    return false;
  }

  getWarInfo() {
    return this.user.getProperty('datas') as {
      war: { victory: number; diff: number };
    };
  }
}
