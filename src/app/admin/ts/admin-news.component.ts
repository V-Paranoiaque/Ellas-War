import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import brushIcon from '@iconify/icons-bi/brush';
import trash2Icon from '@iconify/icons-bi/trash2';

export type newsType = {news_id: number, title: string, link: string, author: string, news_date: number};

@Component({
  templateUrl: '../html/admin-news.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminNewsComponent implements OnInit, OnDestroy {
  public adminNewsList:newsType[];
  public adminNewsMax:number;
  public adminNewsPage:number;
  public newsSelected:newsType;
  
  Tools = Tools;
  parseInt = parseInt;
  
  brushIcon = brushIcon;
  trash2Icon= trash2Icon;
  
  constructor(private router: Router, private route: ActivatedRoute, 
              private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.adminNewsPage = 1;
    this.adminNewsList = [];
    this.newsSelected = {news_id: 0, title: '', link: '', author: '', news_date: 0};
    this.adminNewsMax = 1;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      
      if(id) {
        this.adminNewsPage = parseInt(id);
      }
      else {
        this.adminNewsPage = 1;
      }
      this.socket.emit('adminNewsList', this.adminNewsPage);
    });
    
    this.socket.on('adminNewsList', (msg:{list:object[], cPage:number, max:number}) => {
      this.adminNewsList = msg.list as newsType[];
      this.adminNewsPage = msg.cPage;
      this.adminNewsMax = msg.max;
    });
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
  
  setNews(info:object) {
    this.newsSelected = Object. assign({}, info as newsType);
  }
  
  newsDelete() {
    this.socket.emit('adminNewsDelete', this.newsSelected.news_id)
  }
  
  newsModify() {
    let title = this.newsSelected.title.trim();
    let link  = this.newsSelected.link.trim();
    let author= this.newsSelected.author.trim();
    
    if(title.length > 0 && link.length > 0 && author.length > 0) {
      let msg = {
        'id':     this.newsSelected.news_id,
        'title':  title,
        'link':   link,
        'author': author
      };
      this.socket.emit('adminNewsModify', msg)
    }
  }
  
  newsNew() {
    let title = this.newsSelected.title;
    let link  = this.newsSelected.link;
    
    if(title && link && title.trim() != '' && link.trim() != '') {
      let msg = {
        'title': title.trim(),
        'link': link.trim()
      };
      this.socket.emit('adminNewsNew', msg)
    }
  }
  
  adminNewsPageChange(page:number) {
    if(!page || page < 1) {
      page = 1;
    }
    
    if(page > this.adminNewsMax) {
      page = this.adminNewsMax;
    }
    
    this.router.navigate(['/admin/support/'+page])
  }
  
}
