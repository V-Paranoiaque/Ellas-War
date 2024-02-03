import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-duplicateemail',
  templateUrl: './admin-duplicateemail.component.html',
  styleUrls: ['../admin/admin.component.css'],
})
export class AdminDuplicateemailComponent implements OnInit, OnDestroy {
  public emails: {
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
    this.emails = {
      list: [],
    };
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.emit('adminEmailDuplicates');

    this.socket.on('adminEmailDuplicates', (list: object) => {
      this.emails = list as typeof this.emails;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminEmailDuplicates');
  }
}
