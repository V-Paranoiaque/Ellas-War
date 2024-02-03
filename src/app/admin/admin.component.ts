import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { Subscription } from 'rxjs';

import eye from '@iconify/icons-fa6-solid/eye';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public adminStats = {
    honnor_last_time: 0,
    diamond_last_time: 0,
    daily_last_time: 0,
    weekly_last_time: 0,
  };
  public apiInfo = {
    uptime: 0,
    timestamp: 0,
    min: 0,
  };

  private sub: Subscription;

  eye = eye;

  constructor(
    protected http: HttpClient,
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminStats');

    const url = this.socket.url + '/api.json';
    this.sub = this.http.get(url).subscribe(result => {
      this.apiInfo = result as typeof this.apiInfo;
    });

    this.socket.on('adminStats', (msg: object) => {
      this.adminStats = msg as typeof this.adminStats;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminStats');

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
