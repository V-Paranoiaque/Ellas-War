import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  selector: 'app-quests-info-popup',
  templateUrl: './quests-info-popup.sub-component.html',
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
