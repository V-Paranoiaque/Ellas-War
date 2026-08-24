import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-attacks-seabattles-mouvements-help-popup',
  templateUrl: './attacks-seabattles-mouvements-help-popup.sub-component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, TranslateDirective, TranslatePipe],
})
export class AttacksSeabattlesMouvementsHelpPopupSubComponent {
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;
}
