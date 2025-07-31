import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IcIconComponent } from 'src/services/ic-icon.service';
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
  imports: [
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainMenuRankingSubComponent,
    MainRightSubComponent,
    RankingplayersHelpPopupSubComponent,
    TranslateModule,
    UserProfileSubComponent,
  ],
})
export class RankingplayersComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  user = inject(User);
  private readonly socket = inject(Socket);
  translate = inject(TranslateService);
  private titleService = inject(Title);

  public rankingList: RankingLine[];
  public rankingMax: number;
  public rankingOrder: string;
  public rankingPage: number;

  private subRank: Subscription;
  private subTitle: Subscription;

  parseInt = parseInt;
  Tools = Tools;

  questionCircle = questionCircle;
  sortUP = sortUP;

  constructor() {
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

    this.subTitle = this.translate
      .get('Watch your enemies on the player rankings')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.subRank.unsubscribe();
    this.subTitle.unsubscribe();
  }

  getPage() {
    const url =
      this.socket.url +
      '/api/rankingPlayers/' +
      this.rankingPage.toString() +
      '/' +
      this.rankingOrder +
      '.json';

    this.subRank = this.http.get(url).subscribe(res => {
      const result = res as {
        cPage: number;
        max: number;
        ranking: RankingLine[];
        order: string;
      };
      this.rankingPage = result.cPage;
      this.rankingMax = result.max;
      this.rankingList = result.ranking;
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
        '/rankingplayers/' + page.toString() + '/' + this.rankingOrder,
      ]);
    } else {
      void this.router.navigate(['/rankingplayers/' + page.toString()]);
    }
  }
}
