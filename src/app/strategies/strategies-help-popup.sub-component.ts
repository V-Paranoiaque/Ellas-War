import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-strategies-help-popup',
  templateUrl: './strategies-help-popup.sub-component.html',
})
export class StrategiesHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
