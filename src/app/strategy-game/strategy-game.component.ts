import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../services/user.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-strategy-game',
  templateUrl: './strategy-game.component.html',
  imports: [MainLeftSubComponent, MainRightSubComponent, TranslateModule],
})
export class StrategyGameComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(
    private titleService: Title,
    public translate: TranslateService,
    public user: User
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get('Set up your strategy')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
