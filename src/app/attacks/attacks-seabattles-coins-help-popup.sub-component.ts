import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-attacks-seabattles-coins-help-popup',
  templateUrl: './attacks-seabattles-coins-help-popup.sub-component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
})
export class AttacksSeabattlesCoinsHelpPopupSubComponent {
  constructor(
    public user: User,
    public translate: TranslateService
  ) {}
}
