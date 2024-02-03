import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketComponent as Socket } from '../../services/socketio.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
})
export class Page404Component implements OnInit {
  constructor(
    private router: Router,
    private socket: Socket
  ) {}

  ngOnInit() {
    if (this.router.url != '/404-test') {
      this.socket.emit('404', this.router.url);
    }
  }
}
