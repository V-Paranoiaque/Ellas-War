import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';

import { EwIconSubComponent } from '../../../services/ew-icon.service';

@Component({
  selector: 'app-messages-content',
  templateUrl: '../html/messages-content.sub-component.html',
  styleUrls: ['../css/messages-content.sub-component.css']
})

export class MessagesContentSubComponent {
  @Input() msg: any;
  @Input() full: any;

  Tools = Tools;
  
  EwIcon    = EwIconSubComponent;
  
  constructor(public user: User, public translate: TranslateService) {
    
  }
}
