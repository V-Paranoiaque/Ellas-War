import { Component, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  template: '',
})
export class AllianceAbstractComponent {
  protected socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
}
