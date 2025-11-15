import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import brushIcon from '@iconify/icons-bi/brush';
import trash2Icon from '@iconify/icons-bi/trash2';

export interface NewsType {
  news_id: number;
  title: string;
  link: string;
  author: string;
  news_date: number;
}

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
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
export class AdminNewsComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  public adminNewsList: NewsType[];
  public adminNewsMax: number;
  public adminNewsPage: number;
  public newsSelected: NewsType;

  Tools = Tools;
  parseInt = parseInt;

  brushIcon = brushIcon;
  trash2Icon = trash2Icon;

  constructor() {
    this.adminNewsPage = 1;
    this.adminNewsList = [];
    this.newsSelected = {
      news_id: 0,
      title: '',
      link: '',
      author: '',
      news_date: 0,
    };
    this.adminNewsMax = 1;
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.adminNewsPage = parseInt(id);
      } else {
        this.adminNewsPage = 1;
      }
      this.socket.emit('adminNewsList', this.adminNewsPage);
    });

    this.socket.on(
      'adminNewsList',
      (msg: { list: object[]; cPage: number; max: number }) => {
        this.adminNewsList = msg.list as NewsType[];
        this.adminNewsPage = msg.cPage;
        this.adminNewsMax = msg.max;
      }
    );
    this.socket.on('adminNewsNew', () => {
      this.socket.emit('adminNewsList');
    });
    this.socket.on('adminNewsModify', () => {
      this.socket.emit('adminNewsList');
    });
    this.socket.on('adminNewsDelete', () => {
      this.socket.emit('adminNewsList');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminNewsList');
    this.socket.removeListener('adminNewsNew');
    this.socket.removeListener('adminNewsModify');
    this.socket.removeListener('adminNewsDelete');
  }

  setNews(info: object) {
    this.newsSelected = { ...(info as NewsType) };
  }

  newsDelete() {
    this.socket.emit('adminNewsDelete', this.newsSelected.news_id);
  }

  newsModify() {
    const title = this.newsSelected.title.trim();
    const link = this.newsSelected.link.trim();
    const author = this.newsSelected.author.trim();

    if (title.length > 0 && link.length > 0 && author.length > 0) {
      const msg = {
        id: this.newsSelected.news_id,
        title: title,
        link: link,
        author: author,
      };
      this.socket.emit('adminNewsModify', msg);
    }
  }

  newsNew() {
    const title = this.newsSelected.title;
    const link = this.newsSelected.link;

    if (title && link && title.trim() != '' && link.trim() != '') {
      const msg = {
        title: title.trim(),
        link: link.trim(),
      };
      this.socket.emit('adminNewsNew', msg);
    }
  }

  adminNewsPageChange(page: number) {
    if (!page || page < 1) {
      page = 1;
    }

    if (page > this.adminNewsMax) {
      page = this.adminNewsMax;
    }

    void this.router.navigate(['/admin/support/' + page.toString()]);
  }
}
