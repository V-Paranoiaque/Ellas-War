import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-connectedplayers',
  templateUrl: './connectedplayers.component.html',
})
export class ConnectedplayersComponent implements OnInit, OnDestroy {
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

  constructor(
    public user: User,
    private http: HttpClient,
    private socket: Socket,
    public translate: TranslateService,
    private titleService: Title
  ) {
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
