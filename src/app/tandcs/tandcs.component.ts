import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-tandcs',
  templateUrl: './tandcs.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MainLeftSubComponent,
    MainRightSubComponent,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class TandcsComponent implements OnInit, OnDestroy {
  private readonly titleService = inject(Title);
  translate = inject(TranslateService);

  private sub: Subscription;

  constructor() {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get('Terms and Conditions of use')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
