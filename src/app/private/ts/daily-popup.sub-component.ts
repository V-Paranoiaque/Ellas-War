import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import { EwIconSubComponent } from '../../../services/ew-icon.service';

@Component({
  selector: 'app-daily-popup',
  templateUrl: '../html/daily-popup.sub-component.html'
})

export class DailyPopupSubComponent {
  @Input() info:any;
  
  EwIcon    = EwIconSubComponent;

  constructor(public user: User, public translate: TranslateService) {
    
  }
}
