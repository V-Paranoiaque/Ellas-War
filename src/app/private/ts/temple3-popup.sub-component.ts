import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  selector: 'temple3-popup',
  templateUrl: '../html/temple3-popup.sub-component.html',
  styleUrls: ['../css/temple-popup.sub-component.css']
})

export class Temple3Popup {
  
  constructor(private socket: Socket, public user: User) {
  }
}
