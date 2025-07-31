import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  private agoraMyStats: { quantity: number; rate: number; solded: number }[];
  private agoraStats: { quantity: number; rate: number; solded: number }[];
  private storeroomMyStats: {
    quantity: number;
    rate: number;
    solded: number;
  }[];
  private storeroomStats: { quantity: number; rate: number; solded: number }[];

  Math = Math;
  parseFloat = parseFloat;
  Tools = Tools;

  constructor() {
    this.agoraMyStats = [];
    this.agoraStats = [];
    this.storeroomMyStats = [];
    this.storeroomStats = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.on('tradeMyStats', data => {
      this.agoraMyStats = data;
    });
    this.socket.on('tradeStats', data => {
      this.agoraStats = data;
    });
    this.socket.on('storeroomMyStats', data => {
      this.storeroomMyStats = data;
    });
    this.socket.on('storeroomStats', data => {
      this.storeroomStats = data;
    });

    this.socket.emit('tradeMyStats');
    this.socket.emit('tradeStats');
    this.socket.emit('storeroomMyStats');
    this.socket.emit('storeroomStats');
  }

  ngOnDestroy() {
    this.socket.removeListener('tradeMyStats');
    this.socket.removeListener('tradeStats');
    this.socket.removeListener('storeroomMyStats');
    this.socket.removeListener('storeroomStats');
  }

  getAgoraMyStats() {
    return this.agoraMyStats;
  }

  getAgoraMyStatsNb() {
    let nb = 0;
    for (const i in this.agoraMyStats) {
      if (this.agoraMyStats[i] && this.agoraMyStats[i].quantity > 0) {
        nb++;
      }
    }
    return nb;
  }

  getAgoraStats() {
    return this.agoraStats;
  }

  getAgoraStatsNb() {
    let nb = 0;
    for (const i in this.agoraStats) {
      if (this.agoraStats[i] && this.agoraStats[i].quantity > 0) {
        nb++;
      }
    }
    return nb;
  }

  getStoreroomMyStats() {
    return this.storeroomMyStats;
  }

  getStoreroomMyStatsNb() {
    let nb = 0;
    for (const i in this.storeroomMyStats) {
      if (this.storeroomMyStats[i] && this.storeroomMyStats[i].quantity > 0) {
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
    for (const i in this.storeroomStats) {
      if (this.storeroomStats[i] && this.storeroomStats[i].quantity > 0) {
        nb++;
      }
    }
    return nb;
  }
}
