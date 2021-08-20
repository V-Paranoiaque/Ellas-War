import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  selector: 'app-alliance-rank-popup',
  templateUrl: '../html/alliance-rank-popup.sub-component.html'
})

export class AllianceRankPopupSubComponent {
  
  @Input() info:any;
   
  questionCircle = questionCircle;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  canSave() {
    //Chief
    if(this.user.getId() == this.user.getPropertyNb('chief')) {
      return true;
    }
    
    //Permission to transmit or second
    if(this.user.getPropertyNb('second') >= 1 ||
       this.user.getPropertyNb('recruiter') == 2 ||
       this.user.getPropertyNb('strategist') == 2 ||
       this.user.getPropertyNb('treasurer') == 2) {
      return true;
    }
    
    return false;
  }
  
  save() {
    if(this.info.help == 5) {
      this.socket.emit('chiefEdit', this.info.membre_id);
    }
    else {
      let data = {
        id:         this.info.membre_id,
        rank_name:  this.info.rank_name,
        second:     this.info.second,
        recruiter:  this.info.recruiter,
        strategist: this.info.strategist,
        treasurer:  this.info.treasurer
      };
      this.socket.emit('rankEdit', data);
    }
  }
  
  setHelp(nb:number) {
    this.info.help = nb;
  }
}
