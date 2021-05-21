import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import { environment } from './../../../environments/environment';

import brushIcon from '@iconify/icons-bi/brush';

@Component({
  templateUrl: '../html/admin-quests.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminQuests {
  public adminQuestList:any;
  public adminQuestReward: any;
  public questInfo:any;
  public ressList:any;
  public rewardInfo:any;
  
  //Icons
  brushIcon    = brushIcon;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.ressList = environment.resources;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminQuestList');
    this.socket.emit('adminQuestReward');
    
    this.resetQuest();
    this.resetReward();
    
    this.socket.on('adminQuestList', (msg:any) => {
      this.adminQuestList = msg;
    });
    this.socket.on('adminQuestListRefresh', () => {
      this.socket.emit('adminQuestList');
    });
    this.socket.on('adminQuestReward', (msg:any) => {
      this.adminQuestReward = msg;
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
  
  questSave() {
    if(this.questInfo.id == 0) {
      this.socket.emit('adminQuestNew',{
        'nb': this.questInfo.goal,
        'id': this.questInfo.type,
        'reward': this.questInfo.reward,
        'difficulty': this.questInfo.difficulty,
        'level': this.questInfo.level,
        'levelmax': this.questInfo.levelmax
      });
    }
    else {
      this.socket.emit('adminQuestSave',{
        'quest_id': this.questInfo.id,
        'nb': this.questInfo.goal,
        'id': this.questInfo.type,
        'reward': this.questInfo.reward,
        'difficulty': this.questInfo.difficulty,
        'level': this.questInfo.level,
        'levelmax': this.questInfo.levelmax
      });
    }
  }
  
  resetQuest() {
    this.questInfo = {
      'id': 0,
      'difficulty': 0,
      'goal': '',
      'level': 0,
      'levelmax': 0,
      'reward': 0,
      'type': ''
    }
  }
  
  resetReward() {
    this.rewardInfo = {
      'id': 0,
      'quantity': '',
      'ress': 0,
      'reward': '',
      'level': 0
    }
  }
  
  rewardSave() {
    if(this.rewardInfo.id == 0) {
      this.socket.emit('adminQuestRewardNew',{
        'nb': this.rewardInfo.quantity,
        'ress': this.rewardInfo.ress,
        'reward': this.rewardInfo.reward,
        'level': this.rewardInfo.level
      });
    }
    else {
      this.socket.emit('adminQuestRewardSave',{
        'id': this.rewardInfo.id,
        'nb': this.rewardInfo.quantity,
        'ress': this.rewardInfo.ress,
        'reward': this.rewardInfo.reward,
        'level': this.rewardInfo.level
      });
    }
  }
  
  setQuest(quest:any) {
    this.questInfo = {
      'id': quest.quest_id,
      'difficulty': quest.quest_difficulty,
      'goal': quest.quest_goal,
      'level': quest.quest_level,
      'levelmax': quest.quest_levelmax,
      'reward': quest.quest_reward,
      'type': quest.quest_type
    }
  }
  
  setReward(reward:any) {
    this.rewardInfo = {
      'id': reward.reward_id,
      'quantity': reward.reward_quantity,
      'ress': reward.reward_ress,
      'reward': reward.reward_type,
      'level': reward.reward_level
    }
  }
}
