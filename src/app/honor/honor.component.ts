import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, DestroyRef, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LocaleService } from '../../services/locale.service';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { HonorHelpPopupSubComponent } from './honor-help-popup.sub-component';
import { IcIconComponent } from '../../services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainMenuRankingSubComponent } from '../main/main-menu-ranking.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

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
  imports: [
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    MainLeftSubComponent,
    MainMenuRankingSubComponent,
    MainRightSubComponent,
    HonorHelpPopupSubComponent,
    IcIconComponent,
    ReactiveFormsModule,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
    UserProfileSubComponent,
  ],
})
export class HonorComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly socket = inject(Socket);
  private readonly http = inject(HttpClient);
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
  private readonly titleService = inject(Title);
  private readonly destroyRef = inject(DestroyRef)

  public id = 0;
  public list = signal<HonorLine[]>([]);
  public levels: number[];

  private subTitle: Subscription;

  crown = crown;
  questionCircle = questionCircle;

  constructor() {
    this.levels = Array(10) as typeof this.levels;
    this.subTitle = new Subscription();
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
    this.http.get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.list.set(res as HonorLine[]);
      });
  }

  getReward() {
    return this.user.getDatas().honor.rewards[this.id];
  }
}
