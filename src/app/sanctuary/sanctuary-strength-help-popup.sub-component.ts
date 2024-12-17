import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sanctuary-strength-help-popup',
  templateUrl: './sanctuary-strength-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class SanctuaryStrengthHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
