import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';

import bagIcon  from '@iconify/icons-bi/bag';
import clockIcon from '@iconify/icons-fa-regular/clock';
import jarIcon  from '@iconify-icons/akar-icons/jar';
import plusIcon from '@iconify/icons-bi/plus';
import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  templateUrl: '../html/storeroom.component.html',
  styleUrls: ['../css/storeroom.component.css']
})

export class StoreroomComponent implements OnInit, OnDestroy {
  private storeroomList:any;
  private storeroomMyList:any;
  private storeroomMyStats:any;
  private storeroomStats:any;
  
  public storeroom_ress:any;
  public storeroomMin:any;
  public storeroomQuantity:string;
  public storeroomRate:string;
  public storeroomRess:number;
  public minRate:number;
  public displayMode = 0;
  
  bagIcon  = bagIcon;
  clockIcon = clockIcon;
  jarIcon  = jarIcon;
  plusIcon = plusIcon;
  questionCircle = questionCircle;
  
  parseFloat = parseFloat;
  parseInt = parseInt;
  Math = Math;
  Tools = Tools;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.storeroomList = [];
    this.storeroomMyList = [];
    this.storeroomMyStats = [];
    this.storeroomStats = [];
    
    this.storeroom_ress = [].constructor(10);
    this.storeroomMin = {'rate': 0, 'you': 0};
    this.storeroomQuantity = '';
    this.storeroomRate = '';
    this.storeroomRess = 1;
    
    this.minRate = this.user.getDatas().storeroom_min;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.on('storeroomList', (data) => {
      this.storeroomList = data;
    });
    this.socket.on('storeroomListReload', () => {
      this.socket.emit('storeroomList');
      this.storeroomHistory();
    });
    this.socket.on('storeroomMyList', (data) => {
      this.storeroomMyList = data;
    });
    this.socket.on('storeroomMyListReload', () => {
      this.socket.emit('storeroomMyList');
      this.socket.emit('storeroomMin', 1);
      this.storeroomHistory();
    });
    this.socket.on('storeroomMin', (data) => {
      this.storeroomMin = data;
    });
    this.socket.on('storeroomMyStats', (data) => {
      this.storeroomMyStats = data;
    });
    this.socket.on('storeroomStats', (data) => {
      this.storeroomStats = data;
    });
    
    this.socket.emit('storeroomList');
    this.socket.emit('storeroomMyList');
    this.socket.emit('storeroomMyStats');
    this.socket.emit('storeroomStats');
    this.socket.emit('storeroomMin', this.storeroomRess);
  }
  
  ngOnDestroy() {
    this.socket.removeListener('storeroomList');
    this.socket.removeListener('storeroomListReload');
    this.socket.removeListener('storeroomMyList');
    this.socket.removeListener('storeroomMyListReload');
    this.socket.removeListener('storeroomMin');
    this.socket.removeListener('storeroomStats');
  }
  
  getStoreroomList() {
    let list = [];
    let length = this.storeroomList.length - 1;
    for(let i=1;i<=length;i++) {
      list.push(this.storeroomList[i]);
    }
    return list;
  }
  
  getStoreroomMyList() {
    return this.storeroomMyList;
  }

  getStoreroomMyStats() {
    return this.storeroomMyStats;
  }
  
  getStoreroomMyStatsNb() {
    let nb = 0;
    for(let i in this.storeroomMyStats) {
      if(this.storeroomMyStats[i] && this.storeroomMyStats[i].quantity > 0) {
        nb++;
      }
    }
    return nb;
  }
  
  getStoreroomStats() {
    return this.storeroomStats;
  }
  
  getStoreroomStatsNb() {
    let nb = 0;
    for(let i in this.storeroomStats) {
      if(this.storeroomStats[i] && this.storeroomStats[i].quantity > 0) {
        nb++;
      }
    }
    return nb;
  }
  
  selectResources(trade:any) {
    this.storeroom_ress[trade.resource_id] = trade.remaining;
  }
  
  setRess() {
    this.socket.emit('storeroomMin', this.storeroomRess);
  }
  
  storeroomBuy(resource_id: number, quantity: number, rate: number) {
    let msg = {
      'quantity': quantity,
      'rate': rate,
      'ress_id': resource_id
    }
    this.socket.emit('storeroomBuy', msg);
    
    this.storeroom_ress[resource_id] = '';
  }
  
  storeroomRedeem(id:number, quantity:number) {
    let msg = {
      'ress_id' : id,
      'quantity': quantity
    };
    this.socket.emit('storeroomRedeem', msg);
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
  
  storeroomHistory() {
    this.socket.emit('storeroomHistory');
  }

  setDisplayMode(i:number) {
    this.displayMode = i;
  }
}
