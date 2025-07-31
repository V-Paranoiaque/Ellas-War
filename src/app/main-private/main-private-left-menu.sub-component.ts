import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-main-private-left-menu',
  templateUrl: './main-private-left-menu.sub-component.html',
  styleUrls: ['./main-private.component.css'],
  imports: [CommonModule, EwIconSubComponent, RouterModule, TranslateModule],
})
export class MainPrivateLeftMenuSubComponent implements OnInit, OnDestroy {
  socket = inject(Socket);
  user = inject(User);

  private favicon: HTMLLinkElement = document.querySelector('#favicon')!;
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    this.audio.src = './assets/audio/2042.mp3';
    this.audio.load();
  }

  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('msgNewNb');
    }, 0);

    this.socket.on('msgNewNb', (nb: number) => {
      const play = this.user.setNewMsg(nb);

      if (nb > 0) {
        this.favicon.href = 'assets/favicon-notif.png';

        if (this.user.getPropertyNb('sound') == 1 && play == 1) {
          this.audio.play();
        }
      } else {
        this.favicon.href = 'assets/favicon-normal.png';
      }
    });
    this.socket.on('msgRefresh', () => {
      this.socket.emit('msgNewNb');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('msgNewNb');
    this.socket.removeListener('msgRefresh');
  }
}
