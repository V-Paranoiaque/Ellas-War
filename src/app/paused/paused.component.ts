import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-paused',
  templateUrl: './paused.component.html',
})
export class PausedComponent implements OnInit, OnDestroy {
  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.user.checkPermissions([4]);

    this.socket.on('pauseReturn', () => {
      this.user.reload();
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('pauseReturn');
  }

  pauseReturn() {
    this.socket.emit('pauseReturn');

    setTimeout(() => {
      this.user.reload();
    }, 1000);
  }
}
