import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-diplomacy-alliance-help-popup',
  templateUrl: './diplomacy-alliance-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective, TranslatePipe],
})
export class DiplomacyAllianceHelpPopupSubComponent {
  user = inject(User);
}
