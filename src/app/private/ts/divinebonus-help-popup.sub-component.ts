import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  selector: 'divinebonus-help-popup',
  templateUrl: '../html/divinebonus-help-popup.sub-component.html'
})

export class DivineBonusHelpPopup {
  @Input() divineBonus: any;
  
  public goalDays:number;
  public nb:number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.goalDays = 0;
    this.nb = 0;
  }
  
  ngOnInit() {
    this.divineBonus = '';
    let cDay = this.user.getPropertyNb('nbdays') % 100;
    
    if(cDay < 3) {
      this.nb = 3;
    }
    else if(cDay < 7) {
      this.nb = 7;
    }
    else if(cDay < 14) {
      this.nb = 14;
    }
    else if(cDay < 30) {
      this.nb = 30;
    }
    else if(cDay < 50) {
      this.nb = 50;
    }
    else if(cDay < 70) {
      this.nb = 70;
    }
    else{
      this.nb = 99;
    }
    this.goalDays = this.nb - cDay + this.user.getPropertyNb('nbdays');
  }
}
