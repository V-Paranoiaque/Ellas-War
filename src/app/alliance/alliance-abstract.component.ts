import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import { LocaleService } from '../../services/locale.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  template: '',
})
export class AllianceAbstractComponent {
  protected socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
}
