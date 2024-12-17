import { Component, Input } from '@angular/core';
import { Message } from '../../services/message.class';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-messages-title',
  templateUrl: './messages-title.sub-component.html',
  imports: [TranslateModule],
})
export class MessagesTitleSubComponent {
  @Input() msg!: Message;
}
