import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { AdminSupportPopupSubComponent } from './admin-support-popup.sub-component';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import angellistIcon from '@iconify-icons/fa6-brands/angellist';
import brushIcon from '@iconify/icons-bi/brush';
import eye from '@iconify/icons-fa6-solid/eye';

@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    AdminSupportPopupSubComponent,
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminSupportComponent implements OnInit, OnDestroy {
  public adminSupportList: {
    support_id: number;
    support_topic: string;
    support_membre: number;
    support_username: string;
    support_last: number;
    last_username: string;
    support_status: number;
  }[];
  public adminSupportMax: number;
  public adminSupportPage: number;

  parseInt = parseInt;
  Tools = Tools;

  angellistIcon = angellistIcon;
  brushIcon = brushIcon;
  eye = eye;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.adminSupportPage = 1;
    this.adminSupportList = [];
    this.adminSupportMax = 1;
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.adminSupportPage = parseInt(id);
      } else {
        this.adminSupportPage = 1;
      }

      this.socket.emit('adminSupportList', this.adminSupportPage);
    });

    this.socket.on(
      'adminSupportList',
      (msg: { list: object[]; cPage: number; max: number }) => {
        this.adminSupportList = msg.list as typeof this.adminSupportList;
        this.adminSupportPage = msg.cPage;
        this.adminSupportMax = msg.max;
      }
    );

    this.socket.on('adminSupportInfo', () => {
      this.socket.emit('adminSupportList', this.adminSupportPage);
    });
    this.socket.on('contactListRefresh', () => {
      this.socket.emit('adminSupportList', this.adminSupportPage);
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminSupportInfo');
    this.socket.removeListener('adminSupportList');
    this.socket.removeListener('contactListRefresh');
  }

  adminSupportPageChange(page: number) {
    if (!page || page < 1) {
      page = 1;
    }

    if (page > this.adminSupportMax) {
      page = this.adminSupportMax;
    }

    void this.router.navigate(['/admin/support/' + page.toString()]);
  }

  adminSupportStatus(id: number) {
    this.socket.emit('adminSupportStatus', id);
  }
}
