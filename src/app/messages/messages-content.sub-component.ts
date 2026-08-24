import { Component, Input, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { Message, MessageContent } from '../../services/message.class';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LocaleService } from '../../services/locale.service';
import { AttacksMessageSubComponent } from '../attacks/attacks-message.sub-component';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { FuryMessageSubComponent } from '../attacks/fury-message.sub-component';
import { LostMessageSubComponent } from '../attacks/lost-message.sub-component';
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
    RouterModule,
    SanctuaryMessageSubComponent,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class MessagesContentSubComponent {
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  @Input() msg!: MessageContent;
  @Input() full!: Message;
  Tools = Tools;
}
