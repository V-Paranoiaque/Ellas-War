import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  selector: 'temple-info-popup',
  templateUrl: '../html/temple-info-popup.sub-component.html',
  styleUrls: ['../css/temple-info-popup.sub-component.css']
})

export class TempleInfoPopup {
  
  constructor(private socket: Socket, public user: User) {
  }
}
