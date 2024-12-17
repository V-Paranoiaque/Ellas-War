import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { AllianceIncludeComponent } from './alliance-include.component';

@Component({
  selector: 'app-alliance-archives-popup',
  templateUrl: './alliance-archives-popup.sub-component.html',
  imports: [AllianceIncludeComponent, CommonModule, TranslateModule],
})
export class AllianceArchivesPopupSubComponent implements OnInit, OnDestroy {
  public archiveCurrent: number;
  public archivePages: number;
  public archiveList: {
    type: number;
    title: {
      attacker: string;
      defender: string;
      ask_id: number;
      refuse: number;
      destroy: number;
      chief_old: number;
      ask_name: string;
      dst_name: string;
      attacking_name: string;
      defender_name: string;
      member: string;
      chief_new: string;
    };
    content: {
      attacker: string;
      defender: string;
      benefits: number;
      username: string;
      dst_name: string;
      player_name: string;
      member: string;
      player: string;
      nameWinner: string;
      vicWinner: string;
      nameLooser: string;
      vicLooser: number;
      chief_old: string;
      name1: string;
      name2: string;
      chief_new: string;
      ask_name: string;
      attacking_name: string;
      defender_name: string;
    };
    alliance_history_date: number;
  }[];

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.archiveCurrent = 1;
    this.archivePages = 1;
    this.archiveList = [];
  }

  ngOnInit() {
    this.init();

    this.socket.on('archiveList', data => {
      this.archiveList = data as typeof this.archiveList;
    });
    this.socket.on('archiveListRefresh', () => {
      this.init();
    });
    this.socket.on('archivePage', (data: number) => {
      this.archivePages = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('archiveList');
    this.socket.removeListener('archiveListRefresh');
    this.socket.removeListener('archivePage');
  }

  init() {
    this.socket.emit('archivePage');
    this.socket.emit('archiveList', this.archiveCurrent);
  }
}
