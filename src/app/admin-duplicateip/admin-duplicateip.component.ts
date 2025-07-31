import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-duplicateip',
  templateUrl: './admin-duplicateip.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminDuplicateipComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public ips: {
    list: {
      membre_id: number;
      username: string;
      email: string;
      last_ip: string;
      level: number;
      last_activity: number;
      inscription: number;
      membre_status: number;
      alliance_name: string;
      rank: number;
      indice: number;
    }[];
  };
  constructor() {
    this.ips = {
      list: [],
    };
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminIPDuplicates');

    this.socket.on('adminIPDuplicates', (list: object) => {
      this.ips = list as typeof this.ips;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminIPDuplicates');
  }
}
