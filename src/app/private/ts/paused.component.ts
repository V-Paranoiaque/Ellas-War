import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/paused.component.html',
  styleUrls: ['../css/paused.component.css']
})

export class Paused {

  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    
  }
  
  pauseReturn() {
    this.socket.emit('pauseReturn');
  }
}
