import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import bagIcon from '@iconify/icons-bi/bag';
import plusIcon from '@iconify/icons-bi/plus';

@Component({
  templateUrl: '../html/storeroom.component.html',
  styleUrls: ['../css/storeroom.component.css']
})

export class Storeroom {
  private storeroomList:any;
  private storeroomStats:any;
  
  public storeroom_ress:any;
  public storeroomMin:any;
  public storeroomQuantity:string;
  public storeroomRate:string;
  public storeroomRess:number;
  
  bagIcon  = bagIcon;
  plusIcon = plusIcon;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.storeroomList = [];
    this.storeroomStats = [],
    
    this.storeroom_ress = [].constructor(10);
    this.storeroomMin = {'rate': 0, 'you': 0};
    this.storeroomQuantity = '';
    this.storeroomRate = '';
    this.storeroomRess = 1;
    
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
      this.socket.emit("storeroomMyList");
      this.socket.emit("storeroomStats");
      this.socket.emit("storeroomMin", this.storeroomRess);
    }, 0);
  }
  
  getStoreroomList() {
    let list = [];
    let length = this.storeroomList.length - 1;
    for(let i=1;i<=length;i++) {
      list.push(this.storeroomList[i]);
    }
    return list;
  }
  
  getStoreroomStats() {
    return this.storeroomStats;
  }
  
  selectResources(trade:any) {
    this.storeroom_ress[trade.resource_id] = trade.remaining;
  }
  
  storeroomBuy(resource_id:any, quantity:any, rate:any) {
    let msg = {
      'quantity': quantity,
      'rate': rate,
      'ress_id': resource_id
    }
    this.socket.emit('storeroomBuy', msg);
  }
  
  storeroomSell() {
    let msg = {
      'quantity': this.storeroomQuantity,
      'rate': this.storeroomRate,
      'ress_id': this.storeroomRess
    }
    this.socket.emit('storeroomSell', msg);
    this.storeroomQuantity = '';
    this.storeroomRate = '';
  }
}
