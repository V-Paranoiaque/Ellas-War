import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgoraIncludeComponent } from './agora-include.component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

import bagIcon from '@iconify/icons-bi/bag';
import jarIcon from '@iconify-icons/akar-icons/jar';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';

@Component({
  selector: 'app-agora',
  templateUrl: './agora.component.html',
  styleUrls: ['./agora.component.css'],
  imports: [
    AgoraIncludeComponent,
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
    UserProfileSubComponent,
  ],
})
export class AgoraComponent implements OnInit, OnDestroy {
  quantity: string;
  rate: string;
  agoraRes: number;
  error: number;
  ressList: string[];
  tradeList: {
    trade_id: number;
    seller_id: number;
    deposit_time: number;
    return_time: number;
    nbress: number;
    rate: string;
    ress_type: number;
    anonymous: number;
    username: string;
  }[];
  tradeMyList: {
    trade_id: number;
    seller_id: number;
    deposit_time: number;
    return_time: number;
    nbress: number;
    rate: string;
    ress_type: number;
    anonymous: number;
    username: string;
  }[];
  selectedBatch = {
    trade_id: 0,
    seller_id: 0,
    deposit_time: 0,
    return_time: 0,
    nbress: 0,
    rate: '',
    ress_type: 0,
    anonymous: 0,
    username: '',
  };
  currentRes = 1;
  isAnonymous = false;

  bagIcon = bagIcon;
  jarIcon = jarIcon;
  questionCircle = questionCircle;

  Math = Math;
  Tools = Tools;
  environment = environment;
  parseFloat = parseFloat;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.quantity = '';
    this.rate = '';
    this.agoraRes = 1;
    this.error = 0;
    this.ressList = environment.resources;
    this.tradeList = [];
    this.tradeMyList = [];
  }

  ngOnInit() {
    this.selectRes(1);
    this.socket.emit('tradeMyList');

    this.socket.on('tradeList', data => {
      this.tradeList = data as typeof this.tradeList;
    });
    this.socket.on('tradeListReload', () => {
      this.selectRes(this.currentRes);
      this.socket.removeListener('tradeMyList');
    });
    this.socket.on('tradeMyList', data => {
      this.tradeMyList = data as typeof this.tradeMyList;
    });
    this.socket.on('tradeMyListReload', () => {
      this.socket.emit('tradeMyList');
    });
    this.socket.on('tradeSell', (err: number) => {
      this.error = err;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('tradeList');
    this.socket.removeListener('tradeMyList');
    this.socket.removeListener('tradeListReload');
    this.socket.removeListener('tradeSell');
  }

  sell() {
    this.socket.emit('tradeSell', {
      value: parseFloat(this.quantity),
      price: parseFloat(this.rate),
      ress: this.agoraRes,
      type: 1,
      ano: this.isAnonymous ? 1 : 0,
    });
  }

  selectRes(resId: number) {
    this.currentRes = resId;
    this.socket.emit('tradeList', {
      order: '',
      ress: this.currentRes,
    });
  }

  getLimit(res: string) {
    const resList = this.user.getDatas().trade;

    if (typeof resList === 'object' && Object.hasOwn(resList, res)) {
      return resList[res as keyof typeof resList] as {
        minrate: number;
        maxrate: number;
        limit: number;
        limit_flash: number;
        type: number;
      };
    }
    return {
      minrate: 0,
      maxrate: 0,
      limit: 0,
      limit_flash: 0,
      type: 0,
    };
  }

  selectBatch(batch: object) {
    this.selectedBatch = batch as typeof this.selectedBatch;
  }

  selectAgoraRes(res: number) {
    this.agoraRes = res;
  }

  getAgoraMyList() {
    return this.tradeMyList;
  }
}
