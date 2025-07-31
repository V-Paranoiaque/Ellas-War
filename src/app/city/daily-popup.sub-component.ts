import { RouterModule } from '@angular/router';
import { Component, Input, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { EwIconSubComponent } from 'src/services/ew-icon.service';

import { IdToDivineBonusSubComponent } from './id-to-divinebonus.sub-component';

@Component({
  selector: 'app-daily-popup',
  templateUrl: './daily-popup.sub-component.html',
  imports: [
    EwIconSubComponent,
    IdToDivineBonusSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class DailyPopupSubComponent {
  user = inject(User);
  translate = inject(TranslateService);

  @Input() info!: {
    bonus_id: number;
    msg: number;
    attack: number;
    basket: number;
    basket_small: number;
    basket_medium: number;
    basket_large: number;
  };

  Tools = Tools;
}
