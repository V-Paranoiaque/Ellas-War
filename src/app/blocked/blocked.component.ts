import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
})
export class BlockedComponent implements OnInit, OnDestroy {
  constructor(
    public user: User,
    private socket: Socket,
    private router: Router
  ) {}

  ngOnInit() {
    this.user.checkPermissions([3]);

    this.socket.on('reset', () => {
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('reset');
  }

  reset() {
    this.socket.emit('reset');
  }
}
