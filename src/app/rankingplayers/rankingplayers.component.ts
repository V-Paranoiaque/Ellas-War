import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  DestroyRef,
  inject,
  signal,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LocaleService } from '../../services/locale.service';
import { IcIconComponent } from '../../services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainMenuRankingSubComponent } from '../main/main-menu-ranking.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { RankingplayersHelpPopupSubComponent } from './rankingplayers-help-popup.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import sortUP from '@iconify/icons-fa6-solid/sort-up';

interface RankingLine {
  membre_id: number;
  ranking: number;
  level: number;
  username: string;
  xp: number;
  victory: number;
  field: number;
  honor: number;
}

@Component({
  selector: 'app-rankingplayers',
  templateUrl: './rankingplayers.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainMenuRankingSubComponent,
    MainRightSubComponent,
    RankingplayersHelpPopupSubComponent,
    TranslateDirective,
    TranslatePipe,
    UserProfileSubComponent,
  ],
})
export class RankingplayersComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  user = inject(User);
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  private readonly titleService = inject(Title);
  private readonly destroyRef = inject(DestroyRef);

  public rankingList = signal<RankingLine[]>([]);
  public rankingMax = signal(1);
  public rankingOrder = signal('level');
  public rankingPage = signal(1);

  private subTitle: Subscription;

  parseInt = Number.parseInt;
  Tools = Tools;

  questionCircle = questionCircle;
  sortUP = sortUP;

  constructor() {
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const page = params.get('id');
      const rankingOrder = params.get('order');

      if (page) {
        this.rankingPage.set(Number.parseInt(page));
      }
      if (rankingOrder) {
        this.rankingOrder.set(rankingOrder);
      }

      this.getPage();
    });

    this.subTitle = this.translate
      .get('Watch your enemies on the player rankings')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.subTitle.unsubscribe();
  }

  getPage() {
    const url =
      this.socket.url +
      '/api/rankingPlayers/' +
      this.rankingPage().toString() +
      '/' +
      this.rankingOrder() +
      '.json';

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        const result = res as {
          cPage: number;
          max: number;
          ranking: RankingLine[];
          order: string;
        };
        this.rankingPage.set(result.cPage);
        this.rankingMax.set(result.max);
        this.rankingList.set(result.ranking);
        this.rankingOrder.set(result.order);
      });
  }

  rankingChooseOrder(order: string) {
    this.rankingOrder.set(order);
    this.getPage();
  }

  rankingPageChange(page: number) {
    if (!page || page < 1) {
      page = 1;
    }

    if (page > this.rankingMax()) {
      page = this.rankingMax();
    }

    if (this.rankingOrder() && this.rankingOrder() != 'level') {
      void this.router.navigate([
        '/rankingplayers/' + page.toString() + '/' + this.rankingOrder(),
      ]);
    } else {
      void this.router.navigate(['/rankingplayers/' + page.toString()]);
    }
  }
}
