import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-leave-popup',
  templateUrl: '../html/alliance-leave-popup.sub-component.html'
})

export class AllianceLeavePopup {
  
  constructor(private router: Router, private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  allianceLeave() {
    this.socket.emit('myAllianceLeave');
    this.router.navigate(['/diplomacy'])
  }
}
