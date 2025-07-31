import { ActivatedRoute, RouterModule } from '@angular/router';

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MessagesAbstractComponent } from './messages-abstract.component';

import plusIcon from '@iconify/icons-bi/plus';
import xIcon from '@iconify/icons-bi/x';

@Component({
  selector: 'app-messages-popup',
  templateUrl: './messages-popup.sub-component.html',
  imports: [
    CommonModule,
    FormsModule,
    IcIconComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class MessagesPopupSubComponent
  extends MessagesAbstractComponent
  implements OnInit, OnDestroy
{
  protected route = inject(ActivatedRoute);

  private subLoad: Subscription;

  plusIcon = plusIcon;
  xIcon = xIcon;

  constructor() {
    super();
    this.subLoad = new Subscription();
  }

  override ngOnInit() {
    this.user.checkPermissions([0, 1, 2, 3, 4, 5]);

    this.subLoad = this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id') ?? '0');
      this.reinitDest();
      if (id) {
        this.addDestGUi(id);
      }
    });
  }

  override ngOnDestroy() {
    this.subLoad.unsubscribe();
  }
}
