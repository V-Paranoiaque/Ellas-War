import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  template: '',
})
export class AllianceAbstractComponent {
  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}
}
