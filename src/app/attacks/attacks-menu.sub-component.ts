import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-attacks-menu',
  templateUrl: './attacks-menu.sub-component.html',
})
export class AttacksMenuSubComponent implements OnInit, OnDestroy {
  public myAllianceWar: object[];

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.myAllianceWar = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('myAllianceWar');

    this.socket.on('myAllianceWar', data => {
      this.myAllianceWar = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('myAllianceWar');
  }
}
