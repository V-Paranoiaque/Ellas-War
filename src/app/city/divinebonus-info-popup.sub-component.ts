import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { CommonModule } from '@angular/common';
import { IdToDivineBonusSubComponent } from './id-to-divinebonus.sub-component';

@Component({
  selector: 'app-divinebonus-info-popup',
  templateUrl: './divinebonus-info-popup.sub-component.html',
  imports: [CommonModule, IdToDivineBonusSubComponent, TranslateModule],
})
export class DivineBonusInfoPopupSubComponent {
  @Input() divineBonus!: { bonus_id: number; nb: number; error: number };

  constructor(
    private readonly socket: Socket,
    public translate: TranslateService
  ) {}

  divineBonusUse() {
    const msg = {
      bonus_id: this.divineBonus.bonus_id,
    };

    if (this.divineBonus.nb > 0) {
      this.divineBonus.nb--;
      this.socket.emit('divineBonusUse', msg);
      this.divineBonus.error = 1;
    } else {
      this.divineBonus.error = 0;
    }
  }
}
