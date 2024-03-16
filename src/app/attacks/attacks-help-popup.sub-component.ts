import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-attacks-help-popup',
  templateUrl: './attacks-help-popup.sub-component.html',
})
export class AttacksHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
