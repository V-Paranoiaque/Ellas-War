import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-private-honor-help-popup',
  templateUrl: './main-private-honor-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class MainPrivateHonorHelpPopupSubComponent {
  translate = inject(TranslateService);
}
