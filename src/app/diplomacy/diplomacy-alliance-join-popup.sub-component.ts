import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diplomacy-alliance-join-popup',
  templateUrl: './diplomacy-alliance-join-popup.sub-component.html',
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class DiplomacyAllianceJoinPopupSubComponent {
  @Input() info!: { alliance_id: number; alliance_name: string };

  public candidatetext: string;

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.candidatetext = '';
  }

  allianceJoin() {
    const msg = {
      alliance: this.info.alliance_id,
      msg: this.candidatetext,
    };
    this.socket.emit('allianceJoin', msg);
  }
}
