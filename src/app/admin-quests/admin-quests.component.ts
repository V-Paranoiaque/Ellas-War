import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { AdminQuestsTitleSubComponent } from './admin-quests-title.sub-component';
import { environment } from './../../environments/environment';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import brushIcon from '@iconify/icons-bi/brush';

@Component({
  selector: 'app-admin-quests',
  templateUrl: './admin-quests.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    AdminQuestsTitleSubComponent,
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminQuestsComponent implements OnInit, OnDestroy {
  public adminQuestList: {
    quest_id: number;
    quest_reward: number;
    quest_difficulty: number;
    quest_level: number;
    quest_goal: number;
    quest_type: number;
    quest_levelmax: number;
  }[];
  public adminQuestReward: {
    reward_id: number;
    reward_type: number;
    reward_quantity: number;
    reward_ress: number;
    reward_level: number;
    reward_levelmax: number;
  }[];
  public questInfo = {
    id: 0,
    difficulty: 0,
    goal: '',
    level: 0,
    levelmax: 0,
    reward: 0,
    type: '',
  };
  public ressList: string[];
  public rewardInfo = {
    id: 0,
    quantity: '',
    ress: 0,
    reward: '',
    level: 0,
    levelmax: 0,
  };

  Tools = Tools;

  //Icons
  brushIcon = brushIcon;
  EwIcon = EwIconSubComponent;

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.ressList = environment.resources;
    this.adminQuestList = [];
    this.adminQuestReward = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminQuestList');
    this.socket.emit('adminQuestReward');

    this.resetQuest();
    this.resetReward();

    this.socket.on('adminQuestList', msg => {
      this.adminQuestList = msg;
    });
    this.socket.on('adminQuestListRefresh', () => {
      this.socket.emit('adminQuestList');
    });
    this.socket.on('adminQuestReward', msg => {
      this.adminQuestReward = msg as typeof this.adminQuestReward;
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
    if (this.questInfo.id == 0) {
      this.socket.emit('adminQuestNew', {
        nb: this.questInfo.goal,
        id: this.questInfo.type,
        reward: this.questInfo.reward,
        difficulty: this.questInfo.difficulty,
        level: this.questInfo.level,
        levelmax: this.questInfo.levelmax,
      });
    } else {
      this.socket.emit('adminQuestSave', {
        quest_id: this.questInfo.id,
        nb: this.questInfo.goal,
        id: this.questInfo.type,
        reward: this.questInfo.reward,
        difficulty: this.questInfo.difficulty,
        level: this.questInfo.level,
        levelmax: this.questInfo.levelmax,
      });
    }
  }

  resetQuest() {
    this.questInfo = {
      id: 0,
      difficulty: 0,
      goal: '',
      level: 0,
      levelmax: 0,
      reward: 0,
      type: '',
    };
  }

  resetReward() {
    this.rewardInfo = {
      id: 0,
      quantity: '',
      ress: 0,
      reward: '',
      level: 0,
      levelmax: 0,
    };
  }

  rewardSave() {
    if (this.rewardInfo.id == 0) {
      this.socket.emit('adminQuestRewardNew', {
        nb: this.rewardInfo.quantity,
        ress: this.rewardInfo.ress,
        reward: this.rewardInfo.reward,
        level: this.rewardInfo.level,
        levelmax: this.rewardInfo.levelmax,
      });
    } else {
      this.socket.emit('adminQuestRewardSave', {
        id: this.rewardInfo.id,
        nb: this.rewardInfo.quantity,
        ress: this.rewardInfo.ress,
        reward: this.rewardInfo.reward,
        level: this.rewardInfo.level,
        levelmax: this.rewardInfo.levelmax,
      });
    }
  }

  setQuest(quest: {
    quest_id: number;
    quest_difficulty: number;
    quest_goal: number;
    quest_level: number;
    quest_levelmax: number;
    quest_reward: number;
    quest_type: number;
  }) {
    this.questInfo = {
      id: quest.quest_id,
      difficulty: quest.quest_difficulty,
      goal: quest.quest_goal.toString(),
      level: quest.quest_level,
      levelmax: quest.quest_levelmax,
      reward: quest.quest_reward,
      type: quest.quest_type.toString(),
    };
  }

  setReward(reward: {
    reward_id: number;
    reward_type: number;
    reward_quantity: number;
    reward_ress: number;
    reward_level: number;
    reward_levelmax: number;
  }) {
    this.rewardInfo = {
      id: reward.reward_id,
      quantity: reward.reward_quantity.toString(),
      ress: reward.reward_ress,
      reward: reward.reward_type.toString(),
      level: reward.reward_level,
      levelmax: reward.reward_levelmax,
    };
  }
}
