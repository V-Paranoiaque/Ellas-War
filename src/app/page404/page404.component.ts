import {
  Component,
  OnInit,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateDirective } from '@ngx-translate/core';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MainLeftSubComponent, MainRightSubComponent, TranslateDirective],
})
export class Page404Component implements OnInit {
  private readonly router = inject(Router);
  private readonly socket = inject(Socket);

  ngOnInit() {
    if (this.router.url != '/404-test') {
      this.socket.emit('404', this.router.url);
    }
  }
}
