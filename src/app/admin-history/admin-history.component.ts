import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminHistoryComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public adminUserHistoryList: {
    admin: number;
    username: string;
    type: number;
    time: number;
    data: {
      player_id: number;
      player_username: string;

      searchType: string;
      research: string;
    };
  }[];

  constructor() {
    this.adminUserHistoryList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminUserHistoryList');

    this.socket.on(
      'adminUserHistoryList',
      (
        data: {
          admin_history_player: number;
          username: string;
          admin_history_type: number;
          admin_history_data: string;
          admin_history_time: number;
        }[]
      ) => {
        this.adminUserHistoryList = [];
        for (const h of data) {
          this.adminUserHistoryList.push({
            admin: h.admin_history_player,
            username: h.username,
            type: h.admin_history_type,
            time: h.admin_history_time,
            data: JSON.parse(h.admin_history_data) as {
              player_id: number;
              player_username: string;
              searchType: string;
              research: string;
            },
          });
        }
      }
    );
  }

  ngOnDestroy() {
    this.socket.removeListener('adminUserHistoryList');
  }
}
