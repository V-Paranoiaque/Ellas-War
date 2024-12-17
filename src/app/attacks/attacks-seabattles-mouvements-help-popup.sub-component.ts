import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attacks-seabattles-mouvements-help-popup',
  templateUrl: './attacks-seabattles-mouvements-help-popup.sub-component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
  imports: [CommonModule, TranslateModule],
})
export class AttacksSeabattlesMouvementsHelpPopupSubComponent {
  constructor(
    public user: User,
    public translate: TranslateService
  ) {}
}
