import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

@Component({
  selector: 'app-alliance-create-popup',
  templateUrl: '../html/alliance-create-popup.sub-component.html'
})

export class AllianceCreatePopupSubComponent {
  
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
