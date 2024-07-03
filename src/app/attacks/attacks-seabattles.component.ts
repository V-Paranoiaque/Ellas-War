import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  templateUrl: './attacks-seabattles.component.html',
  styleUrls: ['./attacks.component.css'],
})
export class AttacksSeabattlesComponent implements OnInit, OnDestroy {
  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.socket.emit('sbGet');
  }

  ngOnDestroy() {}
}
