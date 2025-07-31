import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from 'src/services/tools.service';
import { CommonModule } from '@angular/common';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  imports: [
    CommonModule,
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateModule,
  ],
})
export class NewsComponent implements OnInit, OnDestroy {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  translate = inject(TranslateService);
  user = inject(User);
  private readonly socket = inject(Socket);
  private http = inject(HttpClient);

  private newsList: {
    title: string;
    link: string;
    author: string;
    news_date: number;
  }[];
  private subNews: Subscription;
  private subTitle: Subscription;
  private subDesc: Subscription;

  constructor() {
    this.newsList = [];
    this.subNews = new Subscription();
    this.subTitle = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    const url = this.socket.url + '/api/news.json';
    this.subNews = this.http.get(url).subscribe(res => {
      this.newsList = res as typeof this.newsList;
    });

    this.subTitle = this.translate
      .get('Ellas War news')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    this.subDesc = Tools.setDescription(
      this.translate,
      this.metaService,
      'Ellas war news, follow us on social networks.'
    );
  }

  ngOnDestroy() {
    this.subNews.unsubscribe();
    this.subTitle.unsubscribe();
    this.subDesc.unsubscribe();
  }

  getNews() {
    return this.newsList;
  }
}
