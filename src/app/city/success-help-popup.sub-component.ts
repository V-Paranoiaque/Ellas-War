import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-success-help-popup',
  templateUrl: './success-help-popup.sub-component.html',
})
export class SuccessHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
