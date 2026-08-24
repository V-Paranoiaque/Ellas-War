import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-diplomacy-invasion-help-popup',
  templateUrl: './diplomacy-invasion-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class DiplomacyInvasionHelpPopupSubComponent {
  translate = inject(TranslateService);
}
