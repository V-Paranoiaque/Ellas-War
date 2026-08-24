import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rankingplayers-help-popup',
  templateUrl: './rankingplayers-help-popup.sub-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [TranslateDirective],
})
export class RankingplayersHelpPopupSubComponent {
  translate = inject(TranslateService);
}
