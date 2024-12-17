import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [
    CommonModule,
    FormsModule,
    MainLeftSubComponent,
    MainMenuRankingSubComponent,
    MainRightSubComponent,
    TranslateModule,
    UserProfileSubComponent,
  ],
})
export class RankingseabattlesComponent implements OnInit, OnDestroy {
  public rankingList: RankingSBLine[];
  public rankingMax: number;
  public rankingPage: number;

  private subRank: Subscription;
  private subTitle: Subscription;

  parseInt = parseInt;
  Tools = Tools;

  questionCircle = questionCircle;

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
    this.rankingPage = 1;
    this.subRank = new Subscription();
    this.subTitle = new Subscription();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const page = params.get('id');

      if (page) {
        this.rankingPage = parseInt(page);
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
      '/api/rankingSeaBattles/' +
      this.rankingPage.toString() +
      '.json';

    this.subRank = this.http.get(url).subscribe(res => {
      const result = res as {
        cPage: number;
        max: number;
        ranking: RankingSBLine[];
      };
      this.rankingPage = result.cPage;
      this.rankingMax = result.max;
      this.rankingList = result.ranking;
    });
  }

  rankingPageChange(page: number) {
    if (!page || page < 1) {
      page = 1;
    }

    if (page > this.rankingMax) {
      page = this.rankingMax;
    }
    void this.router.navigate(['/rankingseabattles/' + page.toString()]);
  }
}
