import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'fury-message',
  templateUrl: '../html/fury-message.sub-component.html'
})

export class FuryMessage {
  @Input() info: any;

  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
}
