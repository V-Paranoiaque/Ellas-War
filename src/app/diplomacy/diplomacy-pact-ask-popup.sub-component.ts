import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-diplomacy-pact-ask-popup',
  templateUrl: './diplomacy-pact-ask-popup.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateModule],
})
export class DiplomacyPactAskPopupSubComponent implements OnInit, OnDestroy {
  @Input() info!: { alliance_id: number; alliance_name: string };

  public myAllianceProfile = {
    stock_drachma: 0,
  };

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.socket.emit('myAllianceProfile');

    this.socket.on('myAllianceProfile', data => {
      this.myAllianceProfile = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('myAllianceProfile');
  }

  pactAsk() {
    this.socket.emit('alliancePactAsk', this.info.alliance_id);
  }
  pactPossible() {
    if (this.user.getPropertyNb('alliance') === this.info.alliance_id) {
      return false;
    }

    if (
      !this.myAllianceProfile ||
      this.myAllianceProfile.stock_drachma < 750000
    ) {
      return false;
    }

    return true;
  }
}
