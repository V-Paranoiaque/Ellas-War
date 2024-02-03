import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';

import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import sortUP from '@iconify/icons-fa6-solid/sort-up';

type rankingLine = {
  membre_id: number;
  ranking: number;
  level: number;
  username: string;
  xp: number;
  victory: number;
  field: number;
  honnor: number;
};

@Component({
  selector: 'app-rankingplayers',
  templateUrl: './rankingplayers.component.html',
})
export class RankingplayersComponent implements OnInit, OnDestroy {
  public rankingList: rankingLine[];
  public rankingMax: number;
  public rankingOrder: string;
  public rankingPage: number;

  private subRank: Subscription;
  private subTitle: Subscription;

  parseInt = parseInt;
  Tools = Tools;

  questionCircle = questionCircle;
  sortUP = sortUP;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public user: User,
    private socket: Socket,
    public translate: TranslateService,
    private titleService: Title
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
      this.rankingPage +
      '/' +
      this.rankingOrder +
      '.json';

    this.subRank = this.http.get(url).subscribe(res => {
      const result = res as {
        cPage: number;
        max: number;
        ranking: rankingLine[];
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
      this.router.navigate([
        '/rankingplayers/' + page + '/' + this.rankingOrder,
      ]);
    } else {
      this.router.navigate(['/rankingplayers/' + page]);
    }
  }
}
