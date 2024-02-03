import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-admin-pimage',
  templateUrl: './admin-pimage.component.html',
})
export class AdminPimageComponent implements OnInit, OnDestroy {
  public adminImagePlayers: {
    membre_id: number;
    username: string;
    membre_img: string;
  }[] = [];

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.user.checkPermissions([1]);
    this.socket.emit('adminImagePlayers');

    this.socket.on('adminImagePlayers', res => {
      this.adminImagePlayers = res;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminImagePlayers');
  }
}
