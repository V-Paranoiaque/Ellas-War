import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LocaleService } from '../../services/locale.service';
import { IcIconComponent } from '../../services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { QuestsDailySubComponent } from './quests-daily.sub-component';
import { QuestsInfoPopupSubComponent } from './quests-info-popup.sub-component';
import { QuestsMissionsInfoPopupSubComponent } from './quests-missions-info-popup.sub-component';
import { QuestsMissionsSubComponent } from './quests-missions.sub-component';

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
    QuestsDailySubComponent,
    QuestsInfoPopupSubComponent,
    QuestsMissionsInfoPopupSubComponent,
    QuestsMissionsSubComponent,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class QuestsComponent implements OnInit, OnDestroy {
  private readonly questsComponentChangeDetectorRef = inject(ChangeDetectorRef);
  protected socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

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

  constructor() {
    this.myQuestList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.on('myQuestList', data => {
      this.questsComponentChangeDetectorRef.markForCheck();
      this.myQuestList = data as typeof this.myQuestList;
    });
    this.socket.on('myQuestListRefresh', () => {
      this.questsComponentChangeDetectorRef.markForCheck();
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
