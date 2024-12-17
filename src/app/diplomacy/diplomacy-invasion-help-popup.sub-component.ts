import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-diplomacy-invasion-help-popup',
  templateUrl: './diplomacy-invasion-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class DiplomacyInvasionHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
