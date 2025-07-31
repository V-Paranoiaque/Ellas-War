import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-pimage',
  templateUrl: './admin-pimage.component.html',
  imports: [
    AdminLeftMenuSubComponent,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminPimageComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public adminImagePlayers: {
    membre_id: number;
    username: string;
    membre_img: string;
  }[] = [];

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
