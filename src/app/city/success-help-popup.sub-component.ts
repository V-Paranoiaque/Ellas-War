import { Component, inject} from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-success-help-popup',
  templateUrl: './success-help-popup.sub-component.html',
  imports: [TranslateDirective],
})
export class SuccessHelpPopupSubComponent {
  translate = inject(TranslateService);
}
