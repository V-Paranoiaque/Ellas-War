import { Component, Input, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-diplomacy-war-declare-popup',
  templateUrl: './diplomacy-war-declare-popup.sub-component.html',
  imports: [TranslateModule],
})
export class DiplomacyWarDeclarePopupSubComponent {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  @Input() info!: {
    war: number;
    started: number;
    alliance_name: string;
    alliance_id: number;
  };

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
