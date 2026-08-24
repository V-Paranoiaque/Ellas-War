import {
  Component,
  DestroyRef,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class NewsComponent implements OnInit, OnDestroy {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  translate = inject(TranslateService);
  user = inject(User);
  private readonly socket = inject(Socket);
  private readonly http = inject(HttpClient);

  private newsList = signal<
    {
      title: string;
      link: string;
      author: string;
      news_date: number;
    }[]
  >([]);
  private subTitle: Subscription;
  private subDesc: Subscription;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.subTitle = new Subscription();
    this.subDesc = new Subscription();
  }

  ngOnInit() {
    const url = this.socket.url + '/api/news.json';
    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.newsList.set(
          res as {
            title: string;
            link: string;
            author: string;
            news_date: number;
          }[]
        );
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
    this.subTitle.unsubscribe();
    this.subDesc.unsubscribe();
  }

  getNews() {
    return this.newsList();
  }
}
