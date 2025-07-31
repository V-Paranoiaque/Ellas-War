import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  imports: [RouterModule, TranslateModule],
})
export class BlockedComponent implements OnInit, OnDestroy {
  user = inject(User);
  private readonly socket = inject(Socket);
  private readonly router = inject(Router);

  ngOnInit() {
    this.user.checkPermissions([3]);

    this.socket.on('reset', () => {
      void this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('reset');
  }

  reset() {
    this.socket.emit('reset');
  }
}
