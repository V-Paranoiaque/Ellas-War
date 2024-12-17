import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { CommonModule } from '@angular/common';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import volumeMute from '@iconify/icons-fa6-solid/volume-xmark';
import volumeOff from '@iconify/icons-fa6-solid/volume-off';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminChatComponent implements OnInit, OnDestroy {
  public adminChatList: {
    user_id: number;
    censured: number;
    username: string;
    msg: string;
    time: number;
    id: number;
  }[];

  volumeMute = volumeMute;
  volumeOff = volumeOff;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.adminChatList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminChatList');

    this.socket.on('adminChatList', (msg: object[]) => {
      this.adminChatList = msg as typeof this.adminChatList;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminChatList');
  }

  adminChatCensor = (id: number) => {
    this.socket.emit('adminChatCensure', id);
  };
}
