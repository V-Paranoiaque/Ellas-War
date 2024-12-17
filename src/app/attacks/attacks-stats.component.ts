import { Component, OnInit } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';

import { AttacksIncludeComponent } from './attacks-include.component';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  templateUrl: './attacks-stats.component.html',
  styleUrls: ['./attacks.component.css'],
  imports: [
    AttacksIncludeComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateModule,
  ],
})
export class AttacksStatsComponent implements OnInit {
  constructor(
    protected socket: Socket,
    public user: User
  ) {}
  ngOnInit() {
    if (
      this.user.getPropertyNb('level') === 0 &&
      this.user.getPropertyNb('quest') === 11
    ) {
      this.user.questValidateAuto();
    }
    this.socket.emit('msgPage', {
      page: 1,
      category: 4,
    });
  }
}
