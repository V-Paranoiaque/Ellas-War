import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { IcIconComponent } from '../../services/ic-icon.service';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  selector: 'app-quests-info-popup',
  templateUrl: './quests-info-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    EwIconSubComponent,
    IcIconComponent,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class QuestsInfoPopupSubComponent {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  treasureChest = treasureChest;

  myQuestReward() {
    this.socket.emit('myQuestReward');
  }
}
