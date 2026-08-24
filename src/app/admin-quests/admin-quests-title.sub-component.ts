import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-admin-quests-title',
  templateUrl: './admin-quests-title.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, TranslatePipe],
})
export class AdminQuestsTitleSubComponent {
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  @Input() quest!: {
    quest_reward: number;
    quest_difficulty: number;
    quest_level: number;
    quest_goal: number;
    quest_type: number;
    quest_levelmax: number;
  };
}
