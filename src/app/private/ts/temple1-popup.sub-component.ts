import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  selector: 'temple1-popup',
  templateUrl: '../html/temple1-popup.sub-component.html',
  styleUrls: ['../css/temple-popup.sub-component.css']
})

export class Temple1Popup {
  
  constructor(private socket: Socket, public user: User) {
  }
}
