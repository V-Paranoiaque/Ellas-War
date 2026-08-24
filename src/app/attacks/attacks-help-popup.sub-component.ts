import { Component, inject } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-attacks-help-popup',
  templateUrl: './attacks-help-popup.sub-component.html',
  imports: [TranslateDirective],
})
export class AttacksHelpPopupSubComponent {
  translate = inject(TranslateService);
}
