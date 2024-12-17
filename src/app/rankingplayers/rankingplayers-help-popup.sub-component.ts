import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rankingplayers-help-popup',
  templateUrl: './rankingplayers-help-popup.sub-component.html',
  imports: [TranslateModule],
})
export class RankingplayersHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
