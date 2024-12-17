import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-attacks-help-popup',
  templateUrl: './attacks-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class AttacksHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
