import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-success-help-popup',
  templateUrl: './success-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class SuccessHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
