import { Component, Input, inject } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { CommonModule } from '@angular/common';
import { IdToDivineBonusSubComponent } from './id-to-divinebonus.sub-component';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-divinebonus-info-popup',
  templateUrl: './divinebonus-info-popup.sub-component.html',
  imports: [CommonModule, IdToDivineBonusSubComponent, TranslateDirective],
})
export class DivineBonusInfoPopupSubComponent {
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

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
