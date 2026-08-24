import { Component, Input, inject } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { ToolsComponent } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-id-to-divinebonus',
  templateUrl: './id-to-divinebonus.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateDirective],
})
export class IdToDivineBonusSubComponent {
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  @Input()
  id!: number;
  Tools = ToolsComponent;
}
