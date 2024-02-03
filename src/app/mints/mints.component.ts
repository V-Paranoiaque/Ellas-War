import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  templateUrl: './mints.component.html',
})
export class MintsComponent implements OnInit, OnDestroy {
  public list: number[] = [];

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.socket.on('mintProduction', (result: number[]) => {
      this.list = result;
    });

    this.socket.emit('mintProduction');
  }

  ngOnDestroy() {
    this.socket.removeListener('mintProduction');
  }
}
