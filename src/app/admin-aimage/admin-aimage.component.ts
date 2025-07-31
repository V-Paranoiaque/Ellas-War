import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-aimage',
  templateUrl: './admin-aimage.component.html',
  imports: [
    AdminLeftMenuSubComponent,
    RouterModule,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminAimageComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public adminImageAlliance: {
    alliance_id: number;
    alliance_name: string;
    alliance_img: string;
  }[] = [];

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
