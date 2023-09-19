import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-divinebonus-help-popup',
  templateUrl: '../html/divinebonus-help-popup.sub-component.html'
})

export class DivineBonusHelpPopupSubComponent implements OnInit {
  @Input() divineBonus: any;

  Object = Object;
  
  constructor(public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.divineBonus = '';
  }
}
