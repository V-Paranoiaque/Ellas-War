import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  imports: [MainLeftSubComponent, MainRightSubComponent, TranslateModule],
})
export class PartnersComponent implements OnInit, OnDestroy {
  private titleService = inject(Title);
  translate = inject(TranslateService);
  user = inject(User);

  private sub: Subscription;

  constructor() {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub = this.translate
      .get('Ellas War Partners')
      .subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
