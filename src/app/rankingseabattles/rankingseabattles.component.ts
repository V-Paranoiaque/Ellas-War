import { ActivatedRoute, Router } from '@angular/router';
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
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainMenuRankingSubComponent } from '../main/main-menu-ranking.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

import questionCircle from '@iconify/icons-fa6-regular/circle-question';

interface RankingSBLine {
  player_id: number;
  username: string;
  ranking: number;
  points: number;
  sb_participate: number;
  sb_win: number;
}

@Component({
  selector: 'app-rankingseabattles',
  templateUrl: './rankingseabattles.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    FormsModule,
    MainLeftSubComponent,
    MainMenuRankingSubComponent,
    MainRightSubComponent,
    TranslateDirective,
    TranslatePipe,
    UserProfileSubComponent,
  ],
})
export class RankingseabattlesComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  user = inject(User);
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  private readonly titleService = inject(Title);
  private readonly destroyRef = inject(DestroyRef);

  public rankingList = signal<RankingSBLine[]>([]);
  public rankingMax = signal(1);
  public rankingPage = signal(1);

  private subTitle: Subscription;

  parseInt = Number.parseInt;
  Tools = Tools;

  questionCircle = questionCircle;

  constructor() {
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const page = params.get('id');

      if (page) {
        this.rankingPage.set(Number.parseInt(page));
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
      '/api/rankingSeaBattles/' +
      this.rankingPage().toString() +
      '.json';

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        const result = res as {
          cPage: number;
          max: number;
          ranking: RankingSBLine[];
        };
        this.rankingPage.set(result.cPage);
        this.rankingMax.set(result.max);
        this.rankingList.set(result.ranking);
      });
  }

  rankingPageChange(page: number) {
    if (!page || page < 1) {
      page = 1;
    }

    if (page > this.rankingMax()) {
      page = this.rankingMax();
    }
    void this.router.navigate(['/rankingseabattles/' + page.toString()]);
  }
}
