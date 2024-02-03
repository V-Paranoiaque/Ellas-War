import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-aimage',
  templateUrl: './admin-aimage.component.html',
})
export class AdminAimageComponent implements OnInit, OnDestroy {
  public adminImageAlliance: {
    alliance_id: number;
    alliance_name: string;
    alliance_img: string;
  }[] = [];

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.user.checkPermissions([1]);
    this.socket.emit('adminImageAlliance');

    this.socket.on('adminImageAlliance', res => {
      this.adminImageAlliance = res;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminImageAlliance');
  }
}
