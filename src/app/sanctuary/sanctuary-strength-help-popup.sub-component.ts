import { Component, inject } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sanctuary-strength-help-popup',
  templateUrl: './sanctuary-strength-help-popup.sub-component.html',
  imports: [TranslateDirective],
})
export class SanctuaryStrengthHelpPopupSubComponent {
  translate = inject(TranslateService);
}
