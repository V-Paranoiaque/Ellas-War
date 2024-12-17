import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { QuestsIncludeComponent } from './quests-include.component';

@Component({
  selector: 'app-quests-missions-popup',
  templateUrl: './quests-missions-popup.sub-component.html',
  imports: [QuestsIncludeComponent, TranslateModule],
})
export class QuestsMissionsPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
