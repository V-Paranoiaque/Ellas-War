import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  selector: 'common-bottom-bar',
  templateUrl: '../html/common-bottom-bar.component.html'
})

export class CommonBottomBar {
  
  constructor(protected socket: Socket, public user: User) {
  }
}
