import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import plusIcon from '@iconify/icons-bi/plus';

@Component({
  selector: 'app-admin-prayers',
  templateUrl: './admin-prayers.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminPrayersComponent implements OnInit, OnDestroy {
  public adminPrayersList: {
    ask_date: number;
    ask_username: string;
    dest_username: string;
    divinebonus_id: number;
    ask_nb: number;
    ask_status: number;
    divinebonus_ask_id: number;
  }[];
  public request = {
    quantity: '',
    player: '',
    type: 0,
  };

  plusIcon = plusIcon;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.adminPrayersList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminPrayersList');

    this.socket.on('adminPrayersList', data => {
      this.adminPrayersList = data as typeof this.adminPrayersList;
    });
    this.socket.on('adminPrayersRefresh', () => {
      this.socket.emit('adminPrayersList');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminPrayersList');
    this.socket.removeListener('adminPrayersRefresh');
  }

  prayersAsk() {
    this.socket.emit('adminPrayersAsk', {
      target: this.request.player,
      nb: this.request.quantity,
      type: this.request.type,
    });
    this.request = {
      quantity: '',
      player: '',
      type: 0,
    };
  }

  prayersValide(id: number, result: number) {
    this.socket.emit('adminPrayersValide', { id: id, result: result });
  }
}
