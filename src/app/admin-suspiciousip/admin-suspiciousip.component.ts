import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import { CommonModule } from '@angular/common';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-suspiciousip',
  templateUrl: './admin-suspiciousip.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminSuspiciousipComponent implements OnInit, OnDestroy {
  public ipConnection: {
    player1: number;
    player2: number;
    date: number;
    ip: string;
    player1_username: string;
    player1_status: number;
    player2_username: string;
    player2_status: number;
  }[];
  public ipDetected: {
    player1: number;
    player2: number;
    date: number;
    ip: string;
    player1_username: string;
    player1_status: number;
    player2_username: string;
    player2_status: number;
  }[];

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.ipConnection = [];
    this.ipDetected = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminIPConnection');
    this.socket.emit('adminIPDetected');

    this.socket.on('adminIPConnection', (data: { list: object[] }) => {
      this.ipConnection = data.list as typeof this.ipConnection;
    });
    this.socket.on('adminIPDetected', (data: { list: object[] }) => {
      this.ipDetected = data.list as typeof this.ipDetected;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminIPConnection');
    this.socket.removeListener('adminIPDetected');
  }
}
