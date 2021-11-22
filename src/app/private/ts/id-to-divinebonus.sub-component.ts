import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-id-to-divinebonus',
  templateUrl: '../html/id-to-divinebonus.sub-component.html'
})

export class IdToDivineBonusSubComponent {
  @Input()
  id: any;
  
  constructor(public user: User, public translate: TranslateService) {}
  
}
