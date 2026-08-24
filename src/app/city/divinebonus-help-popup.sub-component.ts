import {
  Component,
  Input,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-divinebonus-help-popup',
  templateUrl: './divinebonus-help-popup.sub-component.html',
  styleUrls: ['./city.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    EwIconSubComponent,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class DivineBonusHelpPopupSubComponent {
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

  @Input() divineBonus!: { bonus_id: number; nb: number };

  Object = Object;
}
