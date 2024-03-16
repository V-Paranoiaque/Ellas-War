import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-attacks-unit-help-popup',
  templateUrl: './attacks-unit-help-popup.sub-component.html',
})
export class AttacksUnitHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
