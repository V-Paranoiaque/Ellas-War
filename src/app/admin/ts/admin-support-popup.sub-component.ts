import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';

@Component({
  selector: 'app-admin-support-popup',
  templateUrl: '../html/admin-support-popup.sub-component.html'
})

export class AdminSupportPopupSubComponent {
  msgPlayer = '';
  msgTitle = '';
  msgText = '';
  
  constructor(private socket: Socket) {
    
  }

  send() {
    this.msgTitle = this.msgTitle.trim();
    this.msgText =  this.msgText.trim();
    
    if(this.msgTitle.length > 0 && this.msgText.length > 0) {
      let msg = {
        'id': this.msgPlayer,
        'title': this.msgTitle.trim(),
        'text': this.msgText.trim()
      };
      this.socket.emit('adminSupportNew', msg);
      this.msgPlayer = '';
      this.msgTitle = '';
      this.msgText = '';
    }
  }
}
