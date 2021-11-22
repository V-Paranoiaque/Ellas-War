import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-success-card',
  templateUrl: '../html/success-card.sub-component.html'
})

export class SuccessCardSubComponent {
  @Input()
  title:string;
  @Input()
  text:string;
  @Input()
  currently:any;
  @Input()
  point:string;
  
  constructor(public user: User, public translate: TranslateService) {
    this.title = '';
    this.text = '';
    this.currently = false;
    this.point = '0';
  }
}
