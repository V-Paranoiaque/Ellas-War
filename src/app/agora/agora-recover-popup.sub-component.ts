import { Component, Input } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { CommonModule } from '@angular/common';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
@Component({
  selector: 'app-agora-recover-popup',
  templateUrl: './agora-recover-popup.sub-component.html',
  styleUrls: ['./agora.component.css'],
  imports: [CommonModule, EwIconSubComponent, TranslateModule],
})
export class AgoraRecoverPopupSubComponent {
  @Input() info!: {
    trade_id: number;
    seller_id: number;
    deposit_time: number;
    return_time: number;
    nbress: number;
    rate: string;
    ress_type: number;
    anonymous: number;
    username: string;
  };

  Tools = Tools;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  buy() {
    this.socket.emit('tradeBuy', {
      batch_id: this.info.trade_id,
    });
  }
}
