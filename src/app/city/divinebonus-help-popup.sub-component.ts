import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';

@Component({
  selector: 'app-divinebonus-help-popup',
  templateUrl: './divinebonus-help-popup.sub-component.html',
  styleUrls: ['./city.component.css'],
})
export class DivineBonusHelpPopupSubComponent {
  @Input() divineBonus!: { bonus_id: number; nb: number };

  Object = Object;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {}
}
