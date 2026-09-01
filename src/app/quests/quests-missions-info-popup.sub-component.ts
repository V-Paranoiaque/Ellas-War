import { Component, inject} from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quests-missions-info-popup',
  templateUrl: './quests-missions-info-popup.sub-component.html',
  imports: [TranslateDirective],
})
export class QuestsMissionsInfoPopupSubComponent {
  translate = inject(TranslateService);
}
