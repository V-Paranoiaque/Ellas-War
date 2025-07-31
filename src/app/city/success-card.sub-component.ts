import { Component, Input, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-card',
  templateUrl: './success-card.sub-component.html',
  imports: [CommonModule, TranslateModule],
})
export class SuccessCardSubComponent {
  user = inject(User);
  translate = inject(TranslateService);

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
