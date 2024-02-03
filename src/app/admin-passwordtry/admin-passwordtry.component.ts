import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-passwordtry',
  templateUrl: './admin-passwordtry.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminPasswordtryComponent implements OnInit, OnDestroy {
  public userList: {
    user_id: number;
    username: string;
    time: number;
    ip: string;
    useragent: string;
  }[];

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.userList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminSaveTryList');

    this.socket.on('adminSaveTryList', (list: object[]) => {
      this.userList = list as typeof this.userList;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminSaveTryList');
  }
}
