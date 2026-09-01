import { RouterModule } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
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
    TranslateDirective,
  ],
})
export class AdminSuspiciousipComponent implements OnInit, OnDestroy {
  private readonly adminSuspiciousipComponentChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

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

  constructor() {
    this.ipConnection = [];
    this.ipDetected = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminIPConnection');
    this.socket.emit('adminIPDetected');

    this.socket.on('adminIPConnection', (data: { list: object[] }) => {
      this.adminSuspiciousipComponentChangeDetectorRef.markForCheck();
      this.ipConnection = data.list as typeof this.ipConnection;
    });
    this.socket.on('adminIPDetected', (data: { list: object[] }) => {
      this.adminSuspiciousipComponentChangeDetectorRef.markForCheck();
      this.ipDetected = data.list as typeof this.ipDetected;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminIPConnection');
    this.socket.removeListener('adminIPDetected');
  }
}
