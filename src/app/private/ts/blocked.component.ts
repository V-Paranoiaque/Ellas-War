import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/blocked.component.html',
  styleUrls: ['../css/blocked.component.css']
})

export class Blocked {
  constructor(public user: User, private socket: Socket) {
  }
  
  ngOnInit() {
    this.user.checkPermissions([3]);
    
    this.socket.on('reset', () => {
      document.location.href="/";
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('reset');
  }
  
  reset() {
    this.socket.emit('reset');
  }
}
