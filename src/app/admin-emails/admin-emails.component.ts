import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-emails',
  templateUrl: './admin-emails.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    FormsModule,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminEmailsComponent implements OnInit, OnDestroy {
  public adminemailsPage: number;
  public adminemailsMax: number;
  public adminemailsList: {
    membre_id: number;
    username: string;
    old_mail: string;
    new_mail: string;
    ip_addr: string;
    modification_date: number;
  }[];

  constructor(
    private readonly socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.adminemailsPage = 1;
    this.adminemailsMax = 1;
    this.adminemailsList = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);
    this.getPage(1);

    this.socket.on(
      'adminEmailModification',
      (res: { cPage: number; max: number; list: object[] }) => {
        this.adminemailsPage = res.cPage;
        this.adminemailsMax = res.max;
        this.adminemailsList = res.list as typeof this.adminemailsList;
      }
    );
  }

  ngOnDestroy() {
    this.socket.removeListener('adminEmailModification');
  }

  getPage(id: number, inc = 0) {
    id += inc;
    this.socket.emit('adminEmailModification', id);
  }

  pageLoad(event: Event) {
    const page = (event.target as HTMLInputElement).value;
    this.getPage(parseInt(page));
  }
}
