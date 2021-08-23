import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import brushIcon from '@iconify/icons-bi/brush';
import trash2Icon from '@iconify/icons-bi/trash2';

@Component({
  templateUrl: '../html/admin-news.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminNewsComponent implements OnInit, OnDestroy {
  
  public adminNewsList:any;
  public adminNewsMax:number;
  public adminNewsPage:any;
  public newsSelected:any;
  
  brushIcon = brushIcon;
  trash2Icon= trash2Icon;
  
  constructor(private router: Router, private route: ActivatedRoute, 
              private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    let id = this.route.snapshot.paramMap.get('id');
    
    if(id) {
      this.adminNewsPage = parseInt(id);
    }
    else {
      this.adminNewsPage = 1;
    }
    
    this.adminNewsList = [];
    this.newsSelected = {};
    this.adminNewsMax = 1;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminNewsList', this.adminNewsPage);
    
    this.socket.on('adminNewsList', (msg:any) => {
      console.log(msg);
      
      this.adminNewsList = msg.list;
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
  
  setNews(info:any) {
    this.newsSelected = Object. assign({}, info);
  }
  
  newsDelete() {
    this.socket.emit('adminNewsDelete', this.newsSelected.news_id)
  }
  
  newsModify() {
    let title = this.newsSelected.title;
    let link  = this.newsSelected.link;
    let author= this.newsSelected.author;
    
    if(title && link && author && title.trim() != '' && link.trim() != '' && author.trim() != '') {
      var msg = {
        'id':     this.newsSelected.news_id,
        'title':  title.trim(),
        'link':   link.trim(),
        'author': author.trim()
      };
      this.socket.emit('adminNewsModify', msg)
    }
  }
  
  newsNew() {
    let title = this.newsSelected.title;
    let link  = this.newsSelected.link;
    
    if(title && link && title.trim() != '' && link.trim() != '') {
      var msg = {
        'title': title.trim(),
        'link': link.trim()
      };
      this.socket.emit('adminNewsNew', msg)
    }
  }
  
  adminNewsPageChange(page:any) {
    if(!page || page < 1) {
      page = 1;
    }
    
    if(page > this.adminNewsMax) {
      page = this.adminNewsMax;
    }
    
    this.router.navigate(['/admin/support/'+page])
  }
  
}
