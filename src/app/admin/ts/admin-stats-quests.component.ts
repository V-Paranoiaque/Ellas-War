import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-stats-quests.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminStatsQuestsComponent implements OnInit, OnDestroy {
  public adminQuestList:any;
  public adminQuestReward:any;
  public levelList:number[];
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.adminQuestList = [];
    this.adminQuestReward = [];
    this.levelList = [1,2,3,4,5];
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminQuestList');
    this.socket.emit('adminQuestReward');
    
    this.socket.on('adminQuestList', (msg:any) => {
      this.adminQuestList = [];
      for(let i of msg) {
        if(!this.adminQuestList[i.quest_reward]) {
          this.adminQuestList[i.quest_reward] = []
        }
        this.adminQuestList[i.quest_reward].push(i);
      }
    });
    this.socket.on('adminQuestListRefresh', () => {
      this.socket.emit('adminQuestList');
    });
    this.socket.on('adminQuestReward', (msg:any) => {
      this.adminQuestReward = [];
      for(let i of msg) {
        if(!this.adminQuestReward[i.reward_type]) {
          this.adminQuestReward[i.reward_type] = []
        }
        this.adminQuestReward[i.reward_type].push(i);
      }
    });
    this.socket.on('adminQuestRewardRefresh', () => {
      this.socket.emit('adminQuestReward');
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminQuestList');
    this.socket.removeListener('adminQuestListRefresh');
    this.socket.removeListener('adminQuestReward');
    this.socket.removeListener('adminQuestRewardRefresh');
  }
}
