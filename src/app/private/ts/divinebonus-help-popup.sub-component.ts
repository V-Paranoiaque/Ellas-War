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
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.divineBonus = '';
  }
}
