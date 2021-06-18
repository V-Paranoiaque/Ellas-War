import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/news.component.html'
})

export class News implements OnInit {
  private newsList:any;
  
  constructor(private titleService: Title, public translate: TranslateService,
              public user: User, private socket: Socket, private http: HttpClient) {
    this.newsList = [];
  }
  
  ngOnInit() {
    let url = this.socket.url+'/api/news.json';
    this.http.get(url).subscribe(res => {
      this.newsList = res;
    });
    
    this.translate.get('Ellas War news').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
  
  getNews() {
    return this.newsList;
  }
}
