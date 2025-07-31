import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { QuestsMissionsSubComponent } from './quests-missions.sub-component';

@Component({
  selector: 'app-quests-missions-popup',
  templateUrl: './quests-missions-popup.sub-component.html',
  imports: [QuestsMissionsSubComponent, TranslateModule],
})
export class QuestsMissionsPopupSubComponent {
  translate = inject(TranslateService);
}
