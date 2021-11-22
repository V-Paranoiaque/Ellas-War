import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/news.component.html'
})

export class NewsComponent implements OnInit, OnDestroy {
  private newsList:any;
  private subNews:any;
  private subTitle:any;
  
  constructor(private titleService: Title, public translate: TranslateService,
              public user: User, private socket: Socket, private http: HttpClient) {
    this.newsList = [];
  }
  
  ngOnInit() {
    let url = this.socket.url+'/api/news.json';
    this.subNews = this.http.get(url).subscribe((res:any) => {
      this.newsList = res;
    });
    
    this.subTitle = this.translate.get('Ellas War news').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  ngOnDestroy() {
    this.subNews.unsubscribe();
    this.subTitle.unsubscribe();
  }
  
  getNews() {
    return this.newsList;
  }
}
