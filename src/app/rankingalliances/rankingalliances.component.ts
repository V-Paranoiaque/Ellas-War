import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IcIconComponent } from 'src/services/ic-icon.service';
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
    TranslateModule,
    UserProfileSubComponent,
  ],
})
export class RankingalliancesComponent implements OnInit, OnDestroy {
  public rankingList: {
    ranking: number;
    alliance_id: number;
    alliance_name: number;
    username: string;
    chief_id: number;
    nbmembers: number;
    victories: number;
    defeats: number;
  }[];
  public rankingMax: number;
  public rankingOrder: string;
  public rankingPage: number;

  private subRank: Subscription;
  private subTitle: Subscription;

  parseInt = parseInt;
  Tools = Tools;

  sortUP = sortUP;
  users = users;

  constructor(
    public http: HttpClient,
    private route: ActivatedRoute,
    private readonly router: Router,
    public user: User,
    private readonly socket: Socket,
    private titleService: Title,
    public translate: TranslateService
  ) {
    this.rankingList = [];
    this.rankingMax = 1;
    this.rankingOrder = 'level';
    this.rankingPage = 1;
    this.subRank = new Subscription();
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const page = params.get('id');
      const rankingOrder = params.get('order');

      if (page) {
        this.rankingPage = parseInt(page);
      }
      if (rankingOrder) {
        this.rankingOrder = rankingOrder;
      }

      this.getPage();
    });
    this.socket.on('rankingAlliancesRefresh', () => {
      this.getPage();
    });

    this.subTitle = this.translate
      .get('Watch the power of other alliances')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.socket.removeListener('rankingAlliancesRefresh');
    this.subRank.unsubscribe();
    this.subTitle.unsubscribe();
  }

  getPage() {
    const url =
      this.socket.url +
      '/api/rankingAlliances/' +
      this.rankingPage.toString() +
      '/' +
      this.rankingOrder +
      '.json';

    this.subRank = this.http.get(url).subscribe((resResult: object) => {
      const result = resResult as {
        cPage: number;
        max: number;
        ranking: object[];
        order: string;
      };

      this.rankingPage = result.cPage;
      this.rankingMax = result.max;
      this.rankingList = result.ranking as typeof this.rankingList;
      this.rankingOrder = result.order;
    });
  }

  rankingChooseOrder(order: string) {
    this.rankingOrder = order;
    this.getPage();
  }

  rankingPageChange(page: number) {
    if (!page || page < 1) {
      page = 1;
    }

    if (page > this.rankingMax) {
      page = this.rankingMax;
    }

    if (this.rankingOrder && this.rankingOrder != 'level') {
      void this.router.navigate([
        '/rankingalliances/' + page.toString() + '/' + this.rankingOrder,
      ]);
    } else {
      void this.router.navigate(['/rankingalliances/' + page.toString()]);
    }
  }
}
