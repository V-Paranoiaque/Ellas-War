import { Component, Input, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EwIconSubComponent } from 'src/services/ew-icon.service';

@Component({
  selector: 'app-quests-daily',
  templateUrl: './quests-daily.sub-component.html',
  styleUrls: ['./quests.component.css'],
  imports: [CommonModule, EwIconSubComponent, RouterModule, TranslateModule],
})
export class QuestsDailySubComponent {
  protected socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  @Input()
  subject: string;
  @Input()
  description: string;
  @Input()
  quest!: {
    quest_id: number;
    reward_ress: string;
    reward_quantity: number;
    quest_validated: number;
    quest_current: number;
    quest_goal: number;
    quest_reward: number;
    quest_type: number;
  };
  @Input()
  link: string;

  public showDelete: number;

  constructor() {
    this.showDelete = 0;
    this.subject = '';
    this.description = '';
    this.link = '';
  }

  myQuestValidate(quest: {
    quest_id: number;
    quest_current: number;
    quest_reward: number;
  }) {
    this.socket.emit('myQuestValidate', {
      quest_id: quest.quest_id,
      quest_reward: quest.quest_reward,
    });
  }
  promptQuestAbandon() {
    this.showDelete = (this.showDelete + 1) % 2;
  }
  questGiveup(quest: {
    quest_id: number;
    reward_ress: string;
    reward_quantity: number;
    quest_validated: number;
    quest_current: number;
    quest_goal: number;
    quest_reward: number;
  }) {
    this.socket.emit('myQuestGiveup', {
      quest_id: quest.quest_id,
      quest_current: quest.quest_current,
      quest_reward: quest.quest_reward,
    });
  }
}
