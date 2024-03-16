import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-temple-help-popup',
  templateUrl: './temple-help-popup.sub-component.html',
})
export class TempleHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
