import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-stats-quests.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminStatsQuests {
  public adminQuestList:any;
  public adminQuestReward:any;
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.adminQuestList = [];
    this.adminQuestReward = [];
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminQuestList');
    this.socket.emit('adminQuestReward');
    
    this.socket.on('adminQuestList', (msg:any) => {
      this.adminQuestList = msg;
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
