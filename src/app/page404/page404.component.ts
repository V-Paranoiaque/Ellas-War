import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule } from '@ngx-translate/core';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  imports: [MainLeftSubComponent, MainRightSubComponent, TranslateModule],
})
export class Page404Component implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly socket: Socket
  ) {}

  ngOnInit() {
    if (this.router.url != '/404-test') {
      this.socket.emit('404', this.router.url);
    }
  }
}
