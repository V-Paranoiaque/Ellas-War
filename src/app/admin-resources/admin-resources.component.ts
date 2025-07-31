import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { environment } from './../../environments/environment';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-resources',
  templateUrl: './admin-resources.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    FormsModule,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminResourcesComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public ressList: string[];
  public give = {
    player: '',
    resource: 0,
    quantity: '',
    reason: 3,
  };
  public error: number;

  constructor() {
    this.ressList = environment.resources;
    this.error = 0;
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.socket.on('adminResGive', (error: number) => {
      this.error = error;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminResGive');
  }

  sendRes() {
    this.error = 0;
    this.socket.emit('adminResGive', {
      target: this.give.player,
      nb: this.give.quantity,
      res: this.give.resource,
      type: this.give.reason,
    });
  }
}
