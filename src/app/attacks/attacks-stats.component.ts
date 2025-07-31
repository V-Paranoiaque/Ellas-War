import { Component, OnInit, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { TranslateModule } from '@ngx-translate/core';

import { AttacksHistorySubComponent } from './attacks-history.sub-component';
import { AttacksMenuSubComponent } from './attacks-menu.sub-component';
import { AttacksStatsSubComponent } from './attacks-stats.sub-component';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  templateUrl: './attacks-stats.component.html',
  styleUrls: ['./attacks.component.css'],
  imports: [
    AttacksHistorySubComponent,
    AttacksMenuSubComponent,
    AttacksStatsSubComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateModule,
  ],
})
export class AttacksStatsComponent implements OnInit {
  protected socket = inject(Socket);
  user = inject(User);

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
