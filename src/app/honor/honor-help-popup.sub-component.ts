import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule } from '@ngx-translate/core';

import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

@Component({
  selector: 'app-honor-help-popup',
  templateUrl: './honor-help-popup.sub-component.html',
  imports: [TranslateModule, UserProfileSubComponent],
})
export class HonorHelpPopupSubComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public list: {
    id: number;
    player_id: number;
    username: string;
    honor: number;
  }[] = [];

  constructor(
    private http: HttpClient,
    private readonly socket: Socket
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    const url = this.socket.url + '/api/historyHonor.json';

    this.sub = this.http.get(url).subscribe(result => {
      this.list = result as typeof this.list;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
