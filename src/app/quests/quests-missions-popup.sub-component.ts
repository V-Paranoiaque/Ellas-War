import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quests-missions-popup',
  templateUrl: './quests-missions-popup.sub-component.html',
})
export class QuestsMissionsPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
