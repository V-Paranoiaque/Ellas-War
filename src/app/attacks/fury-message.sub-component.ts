import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from 'src/services/message.class';
import { CommonModule } from '@angular/common';
import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-fury-message',
  templateUrl: './fury-message.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateModule],
})
export class FuryMessageSubComponent {
  @Input() info!: MessageContent['content'];

  Tools = Tools;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {}
}
