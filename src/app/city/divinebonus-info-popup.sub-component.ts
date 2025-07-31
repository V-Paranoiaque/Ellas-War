import { Component, Input, inject } from '@angular/core';
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
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);

  @Input() divineBonus!: { bonus_id: number; nb: number; error: number };

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
