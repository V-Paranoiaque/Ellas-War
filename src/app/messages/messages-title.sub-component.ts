import { Component, Input} from '@angular/core';
import { Message } from '../../services/message.class';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-messages-title',
  templateUrl: './messages-title.sub-component.html',
  imports: [TranslateDirective, TranslatePipe],
})
export class MessagesTitleSubComponent {
  @Input() msg!: Message;
}
