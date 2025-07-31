import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paused',
  templateUrl: './paused.component.html',
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class PausedComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

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
