import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-dissolve-popup',
  templateUrl: '../html/alliance-dissolve-popup.sub-component.html'
})

export class AllianceDissolvePopupSubComponent {
  
  constructor(private router: Router, private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  myAllianceDissolve() {
    this.socket.emit('myAllianceDissolve');
    this.router.navigate(['/diplomacy'])
  }
}
