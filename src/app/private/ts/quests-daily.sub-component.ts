import { Component, Input } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-quests-daily',
  templateUrl: '../html/quests-daily.sub-component.html',
  styleUrls: ['../css/quests-daily.sub-component.css']
})

export class QuestsDailySubComponent {
  @Input()
  subject:string;
  @Input()
  description:string;
  @Input()
  quest:any;
  @Input()
  link:string;
  
  public showDelete:number;
  
  constructor(protected socket: Socket, public user: User, public translate: TranslateService) {
    this.showDelete = 0;
    this.subject = '';
    this.description = '';
    this.link = '';
  }
  
  myQuestValidate(id:number) {
    this.socket.emit('myQuestValidate', id);
  }
  promptQuestAbandon() {
    this.showDelete = (this.showDelete+1)%2;
  }
  questGiveup(quest:any) {
    this.socket.emit('myQuestGiveup', {
      'quest_id': quest.quest_id,
      'quest_current': quest.quest_current,
      'quest_reward': quest.quest_reward
    });
  }
}

