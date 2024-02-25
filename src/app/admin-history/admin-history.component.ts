import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminHistoryComponent implements OnInit, OnDestroy {
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

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
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
