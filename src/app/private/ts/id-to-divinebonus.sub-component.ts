import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EwIconSubComponent } from '../../../services/ew-icon.service';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-id-to-divinebonus',
  templateUrl: '../html/id-to-divinebonus.sub-component.html',
  styleUrls: ['../css/id-to-divinebonus.sub-component.css']
})

export class IdToDivineBonusSubComponent {
  @Input()
  id: any;
  EwIcon = EwIconSubComponent;
  
  constructor(public user: User, public translate: TranslateService) {}
  
}
