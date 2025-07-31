import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-attacks-unit-help-popup',
  templateUrl: './attacks-unit-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class AttacksUnitHelpPopupSubComponent {
  translate = inject(TranslateService);
}
