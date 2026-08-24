import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  imports: [MainLeftSubComponent, MainRightSubComponent, TranslateDirective, TranslatePipe],
})
export class TeamComponent implements OnInit, OnDestroy {
  private readonly titleService = inject(Title);
  translate = inject(TranslateService);

  private sub: Subscription;

  constructor() {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get("The Ellas War's team")
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
