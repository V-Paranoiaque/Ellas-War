import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-first-info-popup',
  templateUrl: './first-info-popup.sub-component.html',
})
export class FirstInfoPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
