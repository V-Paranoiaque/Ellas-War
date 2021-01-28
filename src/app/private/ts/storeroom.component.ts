import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/storeroom.component.html',
  styleUrls: ['../css/storeroom.component.css']
})

export class Storeroom {
  public storeroom_ress:any;
  
  private storeroomList:any;
  private storeroomStats:any;
  
  constructor(private socket: Socket, public user: User) {
    this.storeroom_ress = [].constructor(10);
    
    this.storeroomList = [];
    this.storeroomStats = [],
    
    this.socket.socket.on('storeroomList', (data:any) => {
      this.storeroomList = data;
    });
    this.socket.socket.on('storeroomListReload', () => {
      this.socket.emit('storeroomList');
    });
    this.socket.socket.on('storeroomStats', (data:any) => {
      this.storeroomStats = data;
    });
  }
  
  ngOnInit() {
    setTimeout(()=> {
      this.socket.emit("storeroomList");
      this.socket.emit("storeroomStats");
    });
  }
  
  getStoreroomList() {
    return this.storeroomList;
  }
  getStoreroomStats() {
    return this.storeroomStats;
  }
  
  storeroomBuy(resource_id:any, quantity:any, rate:any) {
    let msg = {
      'quantity': quantity,
      'rate': rate,
      'ress_id': resource_id
    }
    this.socket.emit('storeroomBuy', msg);
  }
}
