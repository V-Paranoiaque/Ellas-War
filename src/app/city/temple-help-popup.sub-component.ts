import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-temple-help-popup',
  templateUrl: './temple-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class TempleHelpPopupSubComponent {
  translate = inject(TranslateService);
}
