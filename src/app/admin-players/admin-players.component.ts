import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-players',
  templateUrl: './admin-players.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    FormsModule,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminPlayersComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public adminPage: number;
  public adminPlayersList: {
    list: {
      membre_id: number;
      username: string;
      level: number;
      email: string;
      last_ip: string;
      alliance_name: string;
      inscription: number;
      last_activity: number;
    }[];
    max: number;
  };
  public banish: boolean;
  public blocked: boolean;
  public normal: boolean;
  public pause: boolean;
  public research: string;
  public searchType: string;

  parseInt = parseInt;
  Tools = Tools;

  constructor() {
    this.adminPage = 1;
    this.adminPlayersList = {
      list: [],
      max: 1,
    };
    this.banish = false;
    this.blocked = false;
    this.normal = false;
    this.pause = false;
    this.research = '';
    this.searchType = 'username';
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.on('adminPlayersResearch', list => {
      this.adminPlayersList = list;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminPlayersResearch');
  }

  adminPlayersResearch() {
    const msg = {
      searchType: this.searchType,
      research: this.research,
      normal: this.normal,
      pause: this.pause,
      blocked: this.blocked,
      banish: this.banish,
      page: this.adminPage,
    };
    this.socket.emit('adminPlayersResearch', msg);
  }

  setPage(page: number) {
    this.adminPage = page;
    this.adminPlayersResearch();
  }
}
