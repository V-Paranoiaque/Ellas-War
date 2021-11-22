import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-fury-message',
  templateUrl: '../html/fury-message.sub-component.html'
})

export class FuryMessageSubComponent {
  @Input() info: any;

  constructor(public user: User, public translate: TranslateService) {
  }
}
