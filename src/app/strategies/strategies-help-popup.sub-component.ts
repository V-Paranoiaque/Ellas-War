import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-strategies-help-popup',
  templateUrl: './strategies-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class StrategiesHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
