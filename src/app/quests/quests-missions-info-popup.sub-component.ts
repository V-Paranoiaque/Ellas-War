import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quests-missions-info-popup',
  templateUrl: './quests-missions-info-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class QuestsMissionsInfoPopupSubComponent {
  translate = inject(TranslateService);
}
