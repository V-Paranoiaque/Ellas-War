import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

@Component({
  selector: 'app-connectedplayers',
  templateUrl: './connectedplayers.component.html',
  imports: [
    CommonModule,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
    UserProfileSubComponent,
  ],
})
export class ConnectedplayersComponent implements OnInit, OnDestroy {
  user = inject(User);
  private http = inject(HttpClient);
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);
  private titleService = inject(Title);

  public connected: {
    membre_id: number;
    username: string;
    level: number;
    field: number;
    alliance: number;
    alliance_name: string;
  }[];
  private subList: Subscription;
  private subTitle: Subscription;

  constructor() {
    this.connected = [];
    this.subList = new Subscription();
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.getPage();

    this.socket.on('chatUserPlayersRefresh', () => {
      this.getPage();
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('chatUserPlayersRefresh');
    this.subTitle.unsubscribe();
    this.subList.unsubscribe();
  }

  getPage() {
    const url = this.socket.url + '/api/connected.json';

    this.subList = this.http.get(url).subscribe(result => {
      this.connected = result as typeof this.connected;
    });
    this.subTitle = this.translate
      .get('Connected players on the Ancient Greece')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }
}
