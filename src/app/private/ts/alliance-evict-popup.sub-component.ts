import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-evict-popup',
  templateUrl: '../html/alliance-evict-popup.sub-component.html'
})

export class AllianceEvictPopupSubComponent {
  
  @Input() info:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  memberEject() {
    this.socket.emit('myAllianceEject', this.info.membre_id);
  }
  
  possible() {
    if(this.user.getPropertyNb('recruiter') > 0 && this.info.allow_eject == 1) {
      return true
    }
    return false;
  }
}
