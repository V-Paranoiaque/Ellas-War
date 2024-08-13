import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';

import bagIcon from '@iconify/icons-bi/bag';
import clockIcon from '@iconify/icons-fa6-regular/clock';
import jarIcon from '@iconify-icons/akar-icons/jar';
import plusIcon from '@iconify/icons-bi/plus';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';

@Component({
  templateUrl: './storeroom.component.html',
})
export class StoreroomComponent implements OnInit, OnDestroy {
  private storeroomList: {
    resource_id: number;
    remaining: number;
    mremaining: number;
    rate: number;
    mrate: number;
  }[];
  private storeroomMyList: {
    resource_id: number;
    remaining: number;
    mremaining: number;
    rate: number;
    mrate: number;
    return_time: number;
    storeroom_id: number;
  }[];

  public storeroom_ress: number[];
  public storeroomMin: {
    min: number;
    rate: number;
    you: number;
  };
  public storeroomQuantity: string;
  public storeroomRate: string;
  public storeroomRess: number;
  public minRate: number;

  bagIcon = bagIcon;
  clockIcon = clockIcon;
  jarIcon = jarIcon;
  plusIcon = plusIcon;
  questionCircle = questionCircle;

  parseFloat = parseFloat;
  parseInt = parseInt;
  Math = Math;
  Tools = Tools;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.storeroomList = [];
    this.storeroomMyList = [];

    this.storeroom_ress = [].constructor(10) as typeof this.storeroom_ress;
    this.storeroomMin = {
      min: 0,
      rate: 0,
      you: 0,
    };
    this.storeroomQuantity = '';
    this.storeroomRate = '';
    this.storeroomRess = 1;

    this.minRate = this.user.getDatas().storeroom_min;
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.on('storeroomList', data => {
      this.storeroomList = data;
    });
    this.socket.on('storeroomListReload', () => {
      this.socket.emit('storeroomList');
      this.storeroomHistory();
    });
    this.socket.on('storeroomMyList', data => {
      this.storeroomMyList = data;
    });
    this.socket.on('storeroomMyListReload', () => {
      this.socket.emit('storeroomMyList');
      this.socket.emit('storeroomMin', 1);
      this.storeroomHistory();
    });
    this.socket.on('storeroomMin', data => {
      this.storeroomMin = data;
    });

    this.socket.emit('storeroomList');
    this.socket.emit('storeroomMyList');
    this.socket.emit('storeroomMin', this.storeroomRess);
  }

  ngOnDestroy() {
    this.socket.removeListener('storeroomList');
    this.socket.removeListener('storeroomListReload');
    this.socket.removeListener('storeroomMyList');
    this.socket.removeListener('storeroomMyListReload');
    this.socket.removeListener('storeroomMin');
  }

  getStoreroomList() {
    const list = [];
    const length = this.storeroomList.length - 1;
    for (let i = 1; i <= length; i++) {
      list.push(this.storeroomList[i]);
    }
    return list;
  }

  getStoreroomMyList() {
    return this.storeroomMyList;
  }

  selectResources(trade: { resource_id: number; remaining: number }) {
    this.storeroom_ress[trade.resource_id] = trade.remaining;
  }

  setRess() {
    this.socket.emit('storeroomMin', this.storeroomRess);
  }

  storeroomBuy(resource_id: number, quantity: number, rate: number) {
    const msg = {
      quantity: quantity,
      rate: rate,
      ress_id: resource_id,
    };
    this.socket.emit('storeroomBuy', msg);

    this.storeroom_ress[resource_id] = 0;
  }

  storeroomRedeem(id: number, quantity: number) {
    const msg = {
      ress_id: id,
      quantity: quantity,
    };
    this.socket.emit('storeroomRedeem', msg);
  }

  storeroomSell() {
    const msg = {
      quantity: this.storeroomQuantity,
      rate: this.storeroomRate,
      ress_id: this.storeroomRess,
    };
    this.socket.emit('storeroomSell', msg);
    this.storeroomQuantity = '';
    this.storeroomRate = '';
  }

  storeroomHistory() {
    this.socket.emit('storeroomHistory');
  }
}
