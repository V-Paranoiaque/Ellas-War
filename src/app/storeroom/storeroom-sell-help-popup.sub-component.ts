import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-storeroom-sell-help-popup',
  templateUrl: './storeroom-sell-help-popup.sub-component.html',
})
export class StoreroomSellHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
