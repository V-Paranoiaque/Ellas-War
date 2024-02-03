import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-quests-title',
  templateUrl: './admin-quests-title.sub-component.html',
})
export class AdminQuestsTitleSubComponent {
  @Input() quest!: {
    quest_reward: number;
    quest_difficulty: number;
    quest_level: number;
    quest_goal: number;
    quest_type: number;
    quest_levelmax: number;
  };

  constructor(public translate: TranslateService) {}
}
