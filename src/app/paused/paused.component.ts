import { RouterModule } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paused',
  templateUrl: './paused.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, RouterModule, TranslatePipe, TranslateDirective],
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
