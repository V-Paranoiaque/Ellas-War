import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sanctuary-strength-help-popup',
  templateUrl: './sanctuary-strength-help-popup.sub-component.html',
})
export class SanctuaryStrengthHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
