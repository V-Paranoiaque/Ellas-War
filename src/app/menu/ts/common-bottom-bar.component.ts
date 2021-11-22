import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-common-bottom-bar',
  templateUrl: '../html/common-bottom-bar.component.html'
})

export class CommonBottomBarComponent {
  
  constructor(protected socket: Socket, public user: User) {
  }
}
