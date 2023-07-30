import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rankingplayers-help-popup',
  templateUrl: '../html/rankingplayers-help-popup.sub-component.html'
})

export class RankingPlayersHelpPopupSubComponent {
  
  constructor(public translate: TranslateService) {
  }
}
