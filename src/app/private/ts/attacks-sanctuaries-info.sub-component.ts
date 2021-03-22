import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import { Attacks } from './attacks.component';

import twotoneFence from '@iconify/icons-ic/twotone-fence';


@Component({
  selector: 'attacks-sanctuaries-info',
  templateUrl: '../html/attacks-sanctuaries-info.sub-component.html',
  styleUrls: ['../css/attacks.component.css']
})

export class AttacksSanctuariesInfo extends Attacks {
  
  @Input() sanctuary:any;
  
  twotoneFence = twotoneFence;
  
  constructor(protected socket: Socket, public user: User, public translate: TranslateService) {
    super(socket, user, translate)
  }
}
