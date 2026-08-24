import { Component, Input, inject } from '@angular/core';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from '../../services/message.class';
import { CommonModule } from '@angular/common';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-fury-message',
  templateUrl: './fury-message.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateDirective, TranslatePipe],
})
export class FuryMessageSubComponent {
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  @Input() info!: MessageContent['content'];

  Tools = Tools;
}
