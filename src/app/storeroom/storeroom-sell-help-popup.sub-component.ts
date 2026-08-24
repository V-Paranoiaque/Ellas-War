import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-storeroom-sell-help-popup',
  templateUrl: './storeroom-sell-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class StoreroomSellHelpPopupSubComponent {
  translate = inject(TranslateService);
}
