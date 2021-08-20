import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-daily-popup',
  templateUrl: '../html/daily-popup.sub-component.html'
})

export class DailyPopupSubComponent {
  @Input() info:any;
  
  constructor(public user: User, public translate: TranslateService) {
    
  }
}
