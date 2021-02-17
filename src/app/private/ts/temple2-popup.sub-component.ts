import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  selector: 'temple2-popup',
  templateUrl: '../html/temple2-popup.sub-component.html',
  styleUrls: ['../css/temple-popup.sub-component.css']
})

export class Temple2Popup {
  
  constructor(private socket: Socket, public user: User) {
  }
}
