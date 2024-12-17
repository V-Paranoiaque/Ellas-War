import { Component, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-card',
  templateUrl: './success-card.sub-component.html',
  imports: [CommonModule, TranslateModule],
})
export class SuccessCardSubComponent {
  @Input()
  title: string;
  @Input()
  text: string;
  @Input()
  currently!: string;
  @Input()
  point: string;

  parseInt = parseInt;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {
    this.title = '';
    this.text = '';
    this.point = '0';
  }
}
