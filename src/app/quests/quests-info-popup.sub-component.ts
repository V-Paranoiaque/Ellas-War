import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { QuestsIncludeComponent } from './quests-include.component';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  selector: 'app-quests-info-popup',
  templateUrl: './quests-info-popup.sub-component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    IcIconComponent,
    QuestsIncludeComponent,
    TranslateModule,
  ],
})
export class QuestsInfoPopupSubComponent {
  treasureChest = treasureChest;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  myQuestReward() {
    this.socket.emit('myQuestReward');
  }
}
