import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { CommonModule } from '@angular/common';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import angellistIcon from '@iconify-icons/fa6-brands/angellist';

interface ContactList {
  id: number;
  name: string;
  email: string;
  text: string;
  send_date: number;
  resolve: number;
}

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminContactComponent implements OnInit, OnDestroy {
  public adminContactList: ContactList[];
  public adminContactMax: number;
  public adminContactPage: number;

  parseInt = parseInt;
  Tools = Tools;

  angellistIcon = angellistIcon;

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    public user: User,
    public translate: TranslateService,
    private readonly socket: Socket
  ) {
    this.adminContactPage = 1;
    this.adminContactList = [];
    this.adminContactMax = 1;
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.adminContactPage = parseInt(id);
      } else {
        this.adminContactPage = 1;
      }
      this.socket.emit('adminContactList', this.adminContactPage);
    });

    this.socket.on(
      'adminContactList',
      (msg: { list: object[]; cPage: number; max: number }) => {
        this.adminContactList = msg.list as ContactList[];
        this.adminContactPage = msg.cPage;
        this.adminContactMax = msg.max;
      }
    );
  }

  ngOnDestroy() {
    this.socket.removeListener('adminContactList');
  }

  adminContactChange(page: number) {
    if (!page || page < 1) {
      page = 1;
    }

    if (page > this.adminContactMax) {
      page = this.adminContactMax;
    }

    void this.router.navigate(['/admin/contact/' + page.toString()]);
  }

  adminContactResolve(id: number) {
    this.socket.emit('adminContactResolve', id);
  }
}
