import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { Subscription } from 'rxjs';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LocaleService } from '../../services/locale.service';
import { IcIconComponent } from '../../services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainMenuRankingSubComponent } from '../main/main-menu-ranking.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

import users from '@iconify/icons-fa6-solid/users';
import sortUP from '@iconify/icons-fa6-solid/sort-up';

@Component({
  selector: 'app-rankingalliances',
  templateUrl: './rankingalliances.component.html',
  imports: [
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainMenuRankingSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
    UserProfileSubComponent,
  ],
})
export class RankingalliancesComponent implements OnInit, OnDestroy {
  private readonly rankingalliancesComponentChangeDetectorRef = inject(ChangeDetectorRef);
  http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  user = inject(User);
  private readonly socket = inject(Socket);
  private readonly titleService = inject(Title);
  translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  readonly currentLocale = inject(LocaleService).currentLocale;

  public rankingList = signal<
    {
      ranking: number;
      alliance_id: number;
      alliance_name: number;
      username: string;
      chief_id: number;
      nbmembers: number;
      victories: number;
      defeats: number;
    }[]
  >([]);
  public rankingMax = signal(1);
  public rankingOrder = signal('level');
  public rankingPage = signal(1);

  private subTitle: Subscription;

  parseInt = Number.parseInt;
  Tools = Tools;

  sortUP = sortUP;
  users = users;

  constructor() {
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.rankingalliancesComponentChangeDetectorRef.markForCheck();
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
    this.socket.on('rankingAlliancesRefresh', () => {
      this.rankingalliancesComponentChangeDetectorRef.markForCheck();
      this.getPage();
    });

    this.subTitle = this.translate
      .get('Watch the power of other alliances')
      .subscribe((res: string) => {
        this.rankingalliancesComponentChangeDetectorRef.markForCheck();
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.socket.removeListener('rankingAlliancesRefresh');
    this.subTitle.unsubscribe();
  }

  getPage() {
    const url =
      this.socket.url +
      '/api/rankingAlliances/' +
      this.rankingPage().toString() +
      '/' +
      this.rankingOrder +
      '.json';

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resResult: object) => {
        this.rankingalliancesComponentChangeDetectorRef.markForCheck();
        const result = resResult as {
          cPage: number;
          max: number;
          ranking: object[];
          order: string;
        };

        this.rankingPage.set(result.cPage);
        this.rankingMax.set(result.max);
        this.rankingList.set(
          result.ranking as {
            ranking: number;
            alliance_id: number;
            alliance_name: number;
            username: string;
            chief_id: number;
            nbmembers: number;
            victories: number;
            defeats: number;
          }[]
        );
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
        '/rankingalliances/' + page.toString() + '/' + this.rankingOrder,
      ]);
    } else {
      void this.router.navigate(['/rankingalliances/' + page.toString()]);
    }
  }
}
