import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import { Attacks } from './attacks.component';

@Component({
  selector: 'attacks-diamond',
  templateUrl: '../html/attacks-diamond.sub-component.html',
  styleUrls: ['../css/attacks.component.css']
})

export class AttacksDiamond extends Attacks {
  
  constructor(protected socket: Socket, public user: User, public translate: TranslateService) {
    super(socket, user, translate);
  }
}
