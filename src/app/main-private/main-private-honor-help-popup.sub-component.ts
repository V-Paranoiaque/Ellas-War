import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-private-honor-help-popup',
  templateUrl: './main-private-honor-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class MainPrivateHonorHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
