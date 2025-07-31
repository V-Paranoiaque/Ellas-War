import { RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import arrowsRotate from '@iconify/icons-fa6-solid/arrows-rotate';
import brushIcon from '@iconify/icons-bi/brush';
import checkIcon from '@iconify/icons-mdi/check';
import trash2Icon from '@iconify/icons-bi/trash2';
import times from '@iconify/icons-fa6-solid/xmark';

@Component({
  selector: 'app-admin-seo',
  templateUrl: './admin-seo.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminSeoComponent implements OnInit, OnDestroy {
  user = inject(User);
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);

  public list: {
    seo_id: number;
    seo_name: string;
    seo_url: string;
    seo_store: number;
    seo_last_visited: number;
    seo_active: number;
    old_update: number;
  }[];
  public currentSite = {
    seo_id: 0,
    seo_name: '',
    seo_url: '',
    seo_store: 0,
    seo_active: 0,
  };

  arrowsRotate = arrowsRotate;
  brushIcon = brushIcon;
  checkIcon = checkIcon;
  trash2Icon = trash2Icon;
  times = times;

  constructor() {
    this.list = [];
  }

  ngOnInit() {
    this.user.checkPermissions([1]);
    this.socket.emit('adminSeoList');

    this.socket.on('adminSeoList', data => {
      this.list = data as typeof this.list;
    });
    this.socket.on('adminSeoListRefresh', () => {
      this.socket.emit('adminSeoList');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminSeoList');
    this.socket.removeListener('adminSeoListRefresh');
  }

  setSite(site: {
    seo_id: number;
    seo_name: string;
    seo_url: string;
    seo_store: number;
    seo_active: number;
  }) {
    this.currentSite = site;
  }

  seoNew() {
    this.socket.emit('adminSeoNew', this.currentSite);
  }
  seoModify() {
    this.socket.emit('adminSeoModify', this.currentSite);
  }
  seoDelete() {
    this.socket.emit('adminSeoDelete', this.currentSite.seo_id);
  }
  seoRefresh(site: {
    seo_id: number;
    seo_name: string;
    seo_url: string;
    seo_store: number;
    seo_active: number;
  }) {
    this.currentSite = site;
    this.socket.emit('adminSeoRefresh', this.currentSite.seo_id);
  }
}
