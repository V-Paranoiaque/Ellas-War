import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  selector: 'quests-info-popup',
  templateUrl: '../html/quests-info-popup.sub-component.html'
})

export class QuestsInfoPopup {
  
  treasureChest = treasureChest;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    
  }
  
  ngOnInit() {
    
  }
  
  ngOnDestroy() {
    
  }
  
  myQuestReward() {
    this.socket.emit('myQuestReward');
  }
}
