import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import users from '@iconify/icons-fa6-solid/users';
import times from '@iconify/icons-fa6-solid/xmark';

@Component({
  selector: 'app-admin-alliances',
  templateUrl: './admin-alliances.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminAlliancesComponent implements OnInit, OnDestroy {
  public adminAlliancesList: {
    alliance_id: number;
    alliance_name: string;
    chief_id: number;
    username: string;
    nbmembers: number;
    victories: number;
    defeats: number;
    pact: number;
    notice: number;
    war: number;
    dissolve: number;
  }[];
  public currentAlliance = {
    id: 0,
    name: '',
  };

  users = users;
  times = times;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.adminAlliancesList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminAlliancesList');

    this.socket.on('adminAlliancesList', (data: object[]) => {
      this.adminAlliancesList = data as typeof this.adminAlliancesList;
    });
    this.socket.on('adminAlliancesListRefresh', () => {
      this.socket.emit('adminAlliancesList');
    });
    this.socket.on('allianceListReload', () => {
      this.socket.emit('adminAlliancesList');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminAlliancesList');
    this.socket.removeListener('adminAlliancesListRefresh');
    this.socket.removeListener('allianceListReload');
  }

  setAlliance(id: number, name: string) {
    this.currentAlliance = {
      id: id,
      name: name,
    };
  }

  confirmAlliance() {
    this.socket.emit('adminAllianceDissolve', this.currentAlliance.id);
  }
}
