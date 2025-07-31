import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import { CommonModule } from '@angular/common';
import { SuccessCardSubComponent } from './success-card.sub-component';

@Component({
  selector: 'app-success-info-popup',
  templateUrl: './success-info-popup.sub-component.html',
  imports: [CommonModule, SuccessCardSubComponent, TranslateModule],
})
export class SuccessInfoPopupSubComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  @Input() successType!: {
    selected: number;
  };

  public statsPlayer = {
    priere: 0,
    jeux: 0,
    don: 0,
    gagner: 0,
    declarer: 0,
    signer: 0,
    espion: 0,
    classh: 0,
    classh10: 0,
    nbdays: 0,
    sb_win: 0,
  };
  public hfNext: { id: number; type: number }[];
  public hfDisplay: { id: number; type: number }[];
  public listDisplay: number[];

  constructor() {
    this.hfNext = [];
    this.hfDisplay = [];

    this.listDisplay = [];
  }

  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('hfNext');
      this.socket.emit('statsPlayer');
    }, 0);

    this.socket.on('statsPlayer', stats => {
      this.statsPlayer = stats;
    });

    this.socket.on('hfNext', list => {
      this.hfNext = list;
      this.socket.emit('hfDisplay');
    });

    this.socket.on('hfDisplay', data => {
      this.hfDisplay = data;
      this.calculate();
    });

    this.socket.on('successRefresh', () => {
      this.socket.emit('hfNext');
      this.socket.emit('statsPlayer');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('statsPlayer');
    this.socket.removeListener('hfNext');
    this.socket.removeListener('hfDisplay');
    this.socket.removeListener('successRefresh');
  }

  calculate() {
    let nbFS = 0;
    this.listDisplay = [];

    const hfNextLength = this.hfNext.length;
    for (let i = 0; i < hfNextLength; i++) {
      if (this.hfNext[i]?.id) {
        this.listDisplay[this.hfNext[i].id] = 1;
      }
    }

    const hfDisplayLength = this.hfDisplay.length;
    for (let i = 0; i < hfDisplayLength; i++) {
      if (!this.hfDisplay[i]) {
        continue;
      }

      //Not all or selected
      if (
        this.successType.selected !== 0 &&
        this.successType.selected !== this.hfDisplay[i].type
      ) {
        continue;
      }

      this.listDisplay[this.hfDisplay[i].id] = 2;

      if (this.successType.selected === 7) {
        nbFS++;
      }
    }
    this.calculateNext(nbFS);
  }

  calculateNext(nbFS: number) {
    const hfNextLength = this.hfNext.length;
    for (let i = 0; i < hfNextLength; i++) {
      if (this.hfNext[i]?.id) {
        if (
          this.successType.selected === 0 ||
          this.successType.selected === this.hfNext[i].type
        ) {
          if (this.listDisplay[this.hfNext[i].id] !== 1) {
            this.listDisplay[this.hfNext[i].id] = 0;
          }
        } else {
          this.listDisplay[this.hfNext[i].id] = 0;
        }
      }
    }

    if (this.successType.selected === 7) {
      this.listDisplay[0] = nbFS;
    }
  }
}
