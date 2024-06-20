import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import crown from '@iconify/icons-fa6-solid/crown';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';

interface HonorLine {
  membre_id: number;
  username: string;
  field: number;
  xp: number;
  victory: number;
  honor: number;
}

@Component({
  templateUrl: './honor.component.html',
})
export class HonorComponent implements OnInit, OnDestroy {
  public id = 0;
  public list: HonorLine[];
  public levels: number[];

  private subRank: Subscription;
  private subTitle: Subscription;

  crown = crown;
  questionCircle = questionCircle;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socket: Socket,
    private http: HttpClient,
    public user: User,
    public translate: TranslateService,
    private titleService: Title
  ) {
    this.levels = Array(10) as typeof this.levels;
    this.subRank = new Subscription();
    this.subTitle = new Subscription();
    this.list = [];
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = parseInt(params.get('id') ?? '0');

      if (!id) {
        id = 0;
      }

      this.load(id);
    });
    this.socket.on('rankingHonorRefresh', () => {
      this.load(this.id);
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('rankingHonorRefresh');
    this.subRank.unsubscribe();
    this.subTitle.unsubscribe();
  }

  load(level: number) {
    if (level > 0 && level <= 10) {
      this.id = level;
    } else {
      this.id = 0;
    }

    if (this.id > 0) {
      this.subTitle = this.translate
        .get('Honor Ranking, page')
        .subscribe((res: string) => {
          this.titleService.setTitle(res + ' ' + this.id.toString());
        });
    } else {
      this.subTitle = this.translate
        .get('Honor ranking, the best fighters')
        .subscribe((res: string) => {
          this.titleService.setTitle(res);
        });
    }

    const url =
      this.socket.url + '/api/rankingHonor/' + this.id.toString() + '.json';
    this.subRank = this.http.get(url).subscribe(res => {
      this.list = res as typeof this.list;
    });
  }

  getReward() {
    return this.user.getDatas().honor.rewards[this.id];
  }
}
