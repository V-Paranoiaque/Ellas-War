import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import { environment } from './../../../environments/environment';

import angleDown from '@iconify/icons-fa-solid/angle-down';
import angleUp from '@iconify/icons-fa-solid/angle-up';
import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  selector: 'player-info-popup',
  templateUrl: '../html/player-info-popup.sub-component.html'
})

export class PlayerInfoPopup {
  public ressList:any;

  //Icons
  angleDown      = angleDown;
  angleUp        = angleUp;
  questionCircle = questionCircle;
  
  constructor(public user: User, public translate: TranslateService) {
    this.ressList = environment.resources;
  }
}
