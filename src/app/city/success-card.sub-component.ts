import { Component, Input, inject } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-success-card',
  templateUrl: './success-card.sub-component.html',
  imports: [CommonModule, TranslateDirective],
})
export class SuccessCardSubComponent {
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  @Input()
  title: string;
  @Input()
  text: string;
  @Input()
  currently!: string;
  @Input()
  point: string;

  parseInt = parseInt;

  constructor() {
    this.title = '';
    this.text = '';
    this.point = '0';
  }
}
