import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-wars',
  templateUrl: './admin-wars.component.html',
  styleUrls: ['../admin/admin.component.css'],
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
    private socket: Socket,
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
