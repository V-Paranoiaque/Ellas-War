import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from 'src/services/message.class';

@Component({
  selector: 'app-fury-message',
  templateUrl: './fury-message.sub-component.html',
})
export class FuryMessageSubComponent {
  @Input() info!: MessageContent['content'];

  Tools = Tools;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {}
}
