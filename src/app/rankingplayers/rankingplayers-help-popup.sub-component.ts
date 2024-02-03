import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rankingplayers-help-popup',
  templateUrl: './rankingplayers-help-popup.sub-component.html',
})
export class RankingplayersHelpPopupSubComponent {
  constructor(public translate: TranslateService) {}
}
