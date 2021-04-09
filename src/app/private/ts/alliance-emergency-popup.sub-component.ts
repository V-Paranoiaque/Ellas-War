import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-emergency-popup',
  templateUrl: '../html/alliance-dissolve-popup.sub-component.html'
})

export class AllianceEmergencyPopup {
  
  constructor(private router: Router, private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
  }
  
  ngOnDestroy() {
  }
  
  myAllianceDissolve() {
    this.socket.emit('myAllianceDissolve');
    this.router.navigate(['/diplomacy'])
  }
}
