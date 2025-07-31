import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  imports: [MainLeftSubComponent, MainRightSubComponent, TranslateModule],
})
export class CreditsComponent implements OnInit, OnDestroy {
  private titleService = inject(Title);
  translate = inject(TranslateService);

  private sub: Subscription;

  constructor() {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate.get('Game credits').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
