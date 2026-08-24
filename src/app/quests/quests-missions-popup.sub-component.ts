import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { QuestsMissionsSubComponent } from './quests-missions.sub-component';

@Component({
  selector: 'app-quests-missions-popup',
  templateUrl: './quests-missions-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [QuestsMissionsSubComponent],
})
export class QuestsMissionsPopupSubComponent {
  translate = inject(TranslateService);
}
