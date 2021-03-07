import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

@Component({
  templateUrl: '../html/support.component.html'
})

export class Support {
  public contactList:any;
  public contactC:number;
  public contactNb:number;
  
  constructor(private socket: Socket) {
    this.contactList = [];
    this.contactNb = 0;
    this.contactC  = 1;
    
    setTimeout(() => {
      this.socket.emit('contactList');
    }, 0);
    
    this.socket.socket.on('contactList', (data:any) => {
      this.contactList = data.list;
      this.contactNb   = data.max;
      this.contactC    = data.cPage;
    });
    
    this.socket.socket.on('contactListRefresh', () => {
       this.socket.emit('contactList');
    });
  }
}
