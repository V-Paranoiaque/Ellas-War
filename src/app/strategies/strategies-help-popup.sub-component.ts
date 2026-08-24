import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-strategies-help-popup',
  templateUrl: './strategies-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class StrategiesHelpPopupSubComponent {
  translate = inject(TranslateService);
}
