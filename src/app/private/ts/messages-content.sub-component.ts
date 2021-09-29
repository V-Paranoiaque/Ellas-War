import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'app-messages-content',
  templateUrl: '../html/messages-content.sub-component.html'
})

export class MessagesContentSubComponent {
  @Input() msg: any;
  @Input() full: any;
  
  constructor(public user: User, public translate: TranslateService) {
    
  }
}
