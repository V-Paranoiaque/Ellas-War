import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { Message, MessageContent } from 'src/services/message.class';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AttacksMessageSubComponent } from '../attacks/attacks-message.sub-component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { FuryMessageSubComponent } from '../attacks/fury-message.sub-component';
import { LostMessageSubComponent } from '../attacks/lost-message.sub-component';
import { MessagesIncludeComponent } from './messages-include.component';
import { SanctuaryMessageSubComponent } from './../sanctuary/sanctuary-message.sub-component';

@Component({
  selector: 'app-messages-content',
  templateUrl: './messages-content.sub-component.html',
  styleUrls: ['./messages.component.css'],
  imports: [
    AttacksMessageSubComponent,
    CommonModule,
    EwIconSubComponent,
    FuryMessageSubComponent,
    LostMessageSubComponent,
    MessagesIncludeComponent,
    RouterModule,
    SanctuaryMessageSubComponent,
    TranslateModule,
  ],
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
