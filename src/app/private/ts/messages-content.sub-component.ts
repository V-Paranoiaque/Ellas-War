import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';

@Component({
  selector: 'app-messages-content',
  templateUrl: '../html/messages-content.sub-component.html'
})

export class MessagesContentSubComponent {
  @Input() msg: any;
  @Input() full: any;

  Tools = Tools;
  
  constructor(public user: User, public translate: TranslateService) {
    
  }
}
