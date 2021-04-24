import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

@Component({
  selector: 'alliance-create-popup',
  templateUrl: '../html/alliance-create-popup.sub-component.html'
})

export class AllianceCreatePopup {
  
  public alliance:any;
  
  constructor(private socket: Socket) {
    this.alliance = {
      'name': '',
      'description': ''
    }
  }
  
  allianceNew() {
    let msg = {
      'name': this.alliance.name,
      'description': this.alliance.description
    };
    this.socket.emit('allianceNew', msg);
  }
}
