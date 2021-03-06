import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

@Component({
  templateUrl: '../html/blocked.component.html',
  styleUrls: ['../css/blocked.component.css']
})

export class Blocked {
  constructor(private socket: Socket) {
    this.socket.socket.on('reset', () => {
      document.location.href="/";
    });
  }
  
  reset() {
    this.socket.emit('reset');
  }
}
