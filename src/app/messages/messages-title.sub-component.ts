import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Message } from '../../services/message.class';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-messages-title',
  templateUrl: './messages-title.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective, TranslatePipe],
})
export class MessagesTitleSubComponent {
  @Input() msg!: Message;
}
