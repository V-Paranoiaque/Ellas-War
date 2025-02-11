import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { CommonModule } from '@angular/common';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-ip',
  templateUrl: './admin-ip.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    EwIconSubComponent,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminIpComponent implements OnInit, OnDestroy {
  public list: {
    players: {
      membre_id: number;
      username: string;
      email: string;
      last_ip: string;
      level: number;
      last_activity: number;
      inscription: number;
      membre_status: number;
      alliance_name: string;
      rank: number;
    }[];
    trade: {
      trade_id: number;
      seller_id: number;
      deposit_time: number;
      return_time: number;
      nbress: number;
      rate: number;
      ress_type: number;
      deposit_ip: string;
      deposit_host: string;
      seller_ano: number;
      buyer_id: number;
      buyer_ano: number;
      purchase_date: number;
      purchase_ip: string;
      purchase_host: string;
      m1_username: string;
      m2_username: string;
      m1_status: number;
      m2_status: number;
    }[];
    storeroom: {
      storeroom_id: number;
      seller_id: number;
      return_time: number;
      quantity: number;
      rate: number;
      resource_id: number;
      deposit_ip: string;
      deposit_host: string;
      buyer_id: number;
      purchase_date: number;
      purchase_ip: string;
      purchase_host: string;
      m1_username: string;
      m2_username: string;
      m1_status: number;
      m2_status: number;
    }[];
  };

  Tools = Tools;

  constructor(
    private readonly socket: Socket,
    public user: User,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.list = {
      players: [],
      trade: [],
      storeroom: [],
    };
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.route.paramMap.subscribe(params => {
      const ip = params.get('ip');
      if (ip) {
        this.socket.emit('adminIPList', ip);
      }
    });

    this.socket.on('adminIPList', (data: object) => {
      this.list = data as typeof this.list;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminIPList');
  }
}
