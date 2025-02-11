import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-passwordtry',
  templateUrl: './admin-passwordtry.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
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
    private readonly socket: Socket,
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
