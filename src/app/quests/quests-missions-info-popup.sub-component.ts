import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quests-missions-info-popup',
  templateUrl: './quests-missions-info-popup.sub-component.html',
  imports: [TranslateModule],
})
export class QuestsMissionsInfoPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
