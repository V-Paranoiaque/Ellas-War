import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent as User } from '../../services/user.service';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-attacks-menu',
  templateUrl: './attacks-menu.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, RouterModule, TranslateModule],
})
export class AttacksMenuSubComponent implements OnInit, OnDestroy {
  protected socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public myAllianceWar: object[];

  constructor() {
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
