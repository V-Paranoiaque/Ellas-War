import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-pauses',
  templateUrl: './admin-pauses.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminPausesComponent implements OnInit, OnDestroy {
  public adminPause: {
    membre_id: number;
    username: string;
    ip: string;
    pause_start: number;
    pause_exit: number;
  }[];

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.adminPause = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminPause');

    this.socket.on('adminPause', (res: object[]) => {
      this.adminPause = res as typeof this.adminPause;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminPause');
  }
}
