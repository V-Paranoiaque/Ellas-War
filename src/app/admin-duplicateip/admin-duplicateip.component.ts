import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-duplicateip',
  templateUrl: './admin-duplicateip.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminDuplicateipComponent implements OnInit, OnDestroy {
  public ips: {
    list: {
      membre_id: number;
      username: string;
      email: string;
      last_ip: string;
      level: number;
      last_activity: number;
      inscription: number;
      membre_status: number;
      alliance_name: string;
      rank: number;
      indice: number;
    }[];
  };
  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.ips = {
      list: [],
    };
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminIPDuplicates');

    this.socket.on('adminIPDuplicates', (list: object) => {
      this.ips = list as typeof this.ips;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminIPDuplicates');
  }
}
