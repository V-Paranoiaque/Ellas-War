import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { Message, MessageContent } from 'src/services/message.class';

@Component({
  selector: 'app-messages-content',
  templateUrl: './messages-content.sub-component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesContentSubComponent {
  @Input() msg!: MessageContent;
  @Input() full!: Message;
  Tools = Tools;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {}
}
