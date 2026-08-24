import { Component, inject } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-strategies-help-popup',
  templateUrl: './strategies-help-popup.sub-component.html',
  imports: [TranslateDirective],
})
export class StrategiesHelpPopupSubComponent {
  translate = inject(TranslateService);
}
