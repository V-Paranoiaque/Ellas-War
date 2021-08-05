import { Component, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'fury-message',
  templateUrl: '../html/fury-message.sub-component.html'
})

export class FuryMessage {
  @Input() info: any;
  @Output() infoChange:any;

  constructor(public user: User, public translate: TranslateService) {
  }
}
