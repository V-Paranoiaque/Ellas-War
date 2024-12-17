import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { IcIconComponent } from 'src/services/ic-icon.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';

@Component({
  selector: 'app-defense-wall-popup',
  templateUrl: './defense-wall-popup.sub-component.html',
  imports: [CommonModule, IcIconComponent, TranslateModule],
})
export class DefenseWallPopupSubComponent implements OnInit, OnDestroy {
  public defenseWallStrength: number;

  Number = Number;

  shieldShaded = shieldShaded;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.defenseWallStrength = 0;
  }

  ngOnInit() {
    this.socket.emit('defenseWallStrength');

    this.socket.on('defenseWallStrength', (data: number) => {
      this.defenseWallStrength = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('defenseWallStrength');
  }
}
