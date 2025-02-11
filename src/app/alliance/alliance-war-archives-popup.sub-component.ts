import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-alliance-war-archives-popup',
  templateUrl: './alliance-war-archives-popup.sub-component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    IcIconComponent,
    TranslateModule,
    UserProfileSubComponent,
  ],
})
export class AllianceWarArchivesPopupSubComponent implements OnInit, OnDestroy {
  @Input() info!: {
    alliance_attacking: number;
    name_attacking: string;
    win_attacking: number;
    alliance_defender: number;
    name_defender: string;
    win_defender: number;
    begin: number;
    time: number;
  };

  public warInfo: {
    end: number;
    time: number;
    list: {
      result: number;
      alliance_defender: number;
      alliance_attacking: number;
      attacking: number;
      defender: number;
      ausername: string;
      dusername: string;
      time: number;
    }[];
    reward: number;
  };

  swordIcon = swordIcon;

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.warInfo = {
      end: 0,
      time: 0,
      list: [],
      reward: 0,
    };
  }

  ngOnInit() {
    this.socket.on('myAllianceWarHistory', data => {
      this.warInfo = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('myAllianceWarHistory');
  }

  warVictory() {
    let min;
    const official = this.getWarInfo().war.victory;
    if (this.info.win_attacking > this.info.win_defender) {
      min = this.info.win_defender;
    } else {
      min = this.info.win_attacking;
    }
    min += this.getWarInfo().war.diff;

    if (min > official) {
      return min;
    } else {
      return official;
    }
  }

  getWarInfo() {
    return this.user.getProperty('datas') as {
      war: { victory: number; diff: number };
    };
  }
}
