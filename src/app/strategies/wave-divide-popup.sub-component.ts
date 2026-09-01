import {
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { FormsModule } from '@angular/forms';

import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-wave-divide-popup',
  templateUrl: './wave-divide-popup.sub-component.html',
  imports: [CommonModule, FormsModule, TranslatePipe, TranslateDirective],
})
export class WaveDividePopupSubComponent {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  @Input() info!: {
    strategy: number;
    code: string;
    wave: number;
    nb: number;
    nbUnit: number;
  };

  Tools = Tools;

  confirm() {
    if (this.info.strategy == 1) {
      this.socket.emit('waveAttackRemove', {
        unit: this.info.code,
        wave: this.info.wave,
        nb: this.info.nbUnit,
      });
    } else {
      this.socket.emit('waveDefenseRemove', {
        unit: this.info.code,
        wave: this.info.wave,
        nb: this.info.nbUnit,
      });
    }
  }
}
