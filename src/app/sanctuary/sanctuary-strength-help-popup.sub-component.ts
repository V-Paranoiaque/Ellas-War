import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sanctuary-strength-help-popup',
  templateUrl: './sanctuary-strength-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class SanctuaryStrengthHelpPopupSubComponent {
  translate = inject(TranslateService);
}
