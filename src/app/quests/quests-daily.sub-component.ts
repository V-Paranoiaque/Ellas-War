import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-quests-daily',
  templateUrl: './quests-daily.sub-component.html',
  styleUrls: ['./quests.component.css'],
})
export class QuestsDailySubComponent {
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

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
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
