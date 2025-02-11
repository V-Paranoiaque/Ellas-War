import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-admin-wars',
  templateUrl: './admin-wars.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    EwIconSubComponent,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminWarsComponent implements OnInit, OnDestroy {
  public list: {
    war_id: number;
    alliance_attacking: number;
    alliance_defender: number;
    win_attacking: number;
    win_defender: number;
    time: number;
    gain: number;
    attacking: string;
    defender: string;
  }[] = [];

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminWarList');

    this.socket.on('adminWarList', (list: object[]) => {
      this.list = list as typeof this.list;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminList404');
  }
}
