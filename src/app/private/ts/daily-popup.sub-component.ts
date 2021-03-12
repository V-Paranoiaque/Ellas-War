import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'daily-popup',
  templateUrl: '../html/daily-popup.sub-component.html'
})

export class DailyPopup {
  @Input() info:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    
  }
}
