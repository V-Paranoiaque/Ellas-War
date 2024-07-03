import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';

@Component({
  templateUrl: './attacks-stats.component.html',
  styleUrls: ['./attacks.component.css'],
})
export class AttacksStatsComponent implements OnInit, OnDestroy {

  constructor(
    protected socket: Socket,
    public user: User,
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

  ngOnDestroy() {

  }
}
