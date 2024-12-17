import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-page404',
  templateUrl: './admin-page404.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminPage404Component implements OnInit, OnDestroy {
  public pageList: { url: string; nb: number }[];

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.pageList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminList404');

    this.socket.on('adminList404', (list: object[]) => {
      this.pageList = list as { url: string; nb: number }[];
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminList404');
  }
}
