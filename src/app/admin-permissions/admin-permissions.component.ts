import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import brushIcon from '@iconify/icons-bi/brush';

@Component({
  selector: 'app-admin-permissions',
  templateUrl: './admin-permissions.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminPermissionsComponent implements OnInit, OnDestroy {
  user = inject(User);
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);

  public adminPermissionsList: {
    membre_id: number;
    username: string;
    rank: string;
    last_activity: number;
  }[];
  public selectedPlayer = {
    membre_id: 0,
    username: '',
    rank: 0,
  };
  public usernameNew: string;

  //Icons
  brushIcon = brushIcon;

  constructor() {
    this.adminPermissionsList = [];
    this.usernameNew = '';
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminPermissionsList');

    this.socket.on('adminPermissionsList', msg => {
      this.adminPermissionsList = msg;
    });

    this.socket.on('adminPermissionsNew', () => {
      this.socket.emit('adminPermissionsList');
    });

    this.socket.on('adminPermissionsModify', () => {
      this.socket.emit('adminPermissionsList');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminPermissionsList');
    this.socket.removeListener('adminPermissionsNew');
    this.socket.removeListener('adminPermissionsModify');
  }

  permissionsNew() {
    this.usernameNew = this.usernameNew.trim();

    if (this.usernameNew.length > 0) {
      this.socket.emit('adminPermissionsNew', this.usernameNew);
      this.usernameNew = '';
    }
  }

  permissionsModify() {
    const msg = {
      id: this.selectedPlayer.membre_id,
      permission: this.selectedPlayer.rank,
    };
    this.socket.emit('adminPermissionsModify', msg);
  }

  selectPlayer(p: object) {
    this.selectedPlayer = p as typeof this.selectedPlayer;
  }
}
