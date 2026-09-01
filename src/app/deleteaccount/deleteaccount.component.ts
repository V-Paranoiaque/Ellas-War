import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  imports: [MainLeftSubComponent, MainRightSubComponent, TranslateDirective],
})
export class DeleteAccountComponent implements OnInit, OnDestroy {
  private readonly deleteAccountComponentChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly titleService = inject(Title);
  translate = inject(TranslateService);

  private sub: Subscription;

  constructor() {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate.get('Game credits').subscribe((res: string) => {
      this.deleteAccountComponentChangeDetectorRef.markForCheck();
      this.titleService.setTitle(res);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
