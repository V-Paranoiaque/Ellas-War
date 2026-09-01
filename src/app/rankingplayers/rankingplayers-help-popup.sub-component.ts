import { Component, inject} from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rankingplayers-help-popup',
  templateUrl: './rankingplayers-help-popup.sub-component.html',
  imports: [TranslateDirective],
})
export class RankingplayersHelpPopupSubComponent {
  translate = inject(TranslateService);
}
