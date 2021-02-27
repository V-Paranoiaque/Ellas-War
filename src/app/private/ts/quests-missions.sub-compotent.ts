import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'quests-missions',
  templateUrl: '../html/quests-missions.sub-compotent.html',
  styleUrls: ['../css/quests-missions.sub-compotent.css']
})

export class QuestsMissions {
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    
  }
  
 questValidate() {
    this.socket.emit("questValidate");
  }
}
