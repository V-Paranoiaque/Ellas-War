import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-diplomacy-invasion-help-popup',
  templateUrl: './diplomacy-invasion-help-popup.sub-component.html',
})
export class DiplomacyInvasionHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
