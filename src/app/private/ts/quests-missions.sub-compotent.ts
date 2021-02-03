import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  selector: 'quests-missions',
  templateUrl: '../html/quests-missions.sub-compotent.html'
})

export class QuestsMissions {
  constructor(private socket: Socket, public user: User) {
    
  }
  
 questValidate() {
    this.socket.emit("questValidate");
  }
}
