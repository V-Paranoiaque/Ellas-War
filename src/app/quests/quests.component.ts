import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { QuestsIncludeComponent } from './quests-include.component';

import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css'],
  imports: [
    CommonModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    QuestsIncludeComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class QuestsComponent implements OnInit, OnDestroy {
  private myQuestList: {
    quest_id: number;
    reward_ress: string;
    reward_quantity: number;
    quest_validated: number;
    quest_current: number;
    quest_goal: number;
    quest_reward: number;
    quest_type: number;
  }[];

  questionCircle = questionCircle;
  treasureChest = treasureChest;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.myQuestList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.on('myQuestList', data => {
      this.myQuestList = data as typeof this.myQuestList;
    });
    this.socket.on('myQuestListRefresh', () => {
      this.socket.emit('myQuestList');
    });

    this.socket.emit('questCheck');
    this.socket.emit('statsTmp');
    this.socket.emit('myQuestList');
  }

  ngOnDestroy() {
    this.socket.removeListener('myQuestList');
    this.socket.removeListener('myQuestListRefresh');
  }

  getMyQuestList() {
    return this.myQuestList;
  }
}
