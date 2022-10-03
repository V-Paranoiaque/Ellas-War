import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';

@Component({
  selector: 'app-fury-message',
  templateUrl: '../html/fury-message.sub-component.html'
})

export class FuryMessageSubComponent {
  @Input() info: any;

  Tools = Tools;

  constructor(public user: User, public translate: TranslateService) {
  }
}
