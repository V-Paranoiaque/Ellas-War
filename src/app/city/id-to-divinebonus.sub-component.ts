import { Component, Input, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToolsComponent } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-id-to-divinebonus',
  templateUrl: './id-to-divinebonus.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, TranslateModule],
})
export class IdToDivineBonusSubComponent {
  user = inject(User);
  translate = inject(TranslateService);

  @Input()
  id!: number;
  Tools = ToolsComponent;
}
