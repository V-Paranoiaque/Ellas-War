import { Component, Input } from '@angular/core';
import { Message } from '../../services/message.class';

@Component({
  selector: 'app-messages-title',
  templateUrl: './messages-title.sub-component.html',
})
export class MessagesTitleSubComponent {
  @Input() msg!: Message;
}
