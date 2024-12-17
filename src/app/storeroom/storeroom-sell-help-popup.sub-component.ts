import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-storeroom-sell-help-popup',
  templateUrl: './storeroom-sell-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class StoreroomSellHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
