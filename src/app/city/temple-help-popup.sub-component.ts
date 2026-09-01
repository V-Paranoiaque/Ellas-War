import { Component, inject} from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-temple-help-popup',
  templateUrl: './temple-help-popup.sub-component.html',
  imports: [TranslateDirective],
})
export class TempleHelpPopupSubComponent {
  translate = inject(TranslateService);
}
