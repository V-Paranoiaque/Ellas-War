import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-sanctuary-strength-update-popup',
  templateUrl: '../html/sanctuary-strength-update-popup.sub-component.html'
})

export class SanctuaryStrengthUpdatePopupSubComponent {
  @Input() info:any;
  
  Number =  Number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    
  }
  
  canUpdate() {
    if(this.info && this.info.price) {
      if(this.info.sanctuaries_power >= 100) {
        return false;
      }
      
      for(let resource of Object.keys(this.info.price)) {
        if(this.info.price[resource] > this.user.getPropertyNb(resource)) {
          return false;
        }
      }
    }
    return true;
  }
  
  strengthen() {
    this.socket.emit('sanctuariesStrengthen', this.info.sanctuaries_id);
  }
}
