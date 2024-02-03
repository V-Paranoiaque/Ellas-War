import { Component } from '@angular/core';
import { UserComponent as User } from 'src/services/user.service';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../environments/environment';

import angleDown from '@iconify/icons-fa6-solid/angle-down';
import angleUp from '@iconify/icons-fa6-solid/angle-up';
import equals from '@iconify/icons-fa6-solid/equals';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';

@Component({
  selector: 'app-main-private-player-info-popup',
  templateUrl: './main-private-player-info-popup.sub-component.html',
  styleUrls: ['./main-private.component.css'],
})
export class MainPrivatePlayerInfoPopupSubComponent {
  public ressList: string[];
  public xpCompare: {
    player1: number;
    player2: number;
  };

  //Icons
  angleDown = angleDown;
  angleUp = angleUp;
  equals = equals;
  questionCircle = questionCircle;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {
    this.ressList = environment.resources;
    this.xpCompare = {
      player1: this.user.getPropertyNb('xp'),
      player2: this.user.getPropertyNb('xp'),
    };
  }

  getVariation(res: string) {
    const variation = this.user.getProperty('var_ress') as object;
    return variation[res as keyof typeof variation];
  }

  xpHelpInit() {
    this.xpCompare.player1 = this.user.getPropertyNb('xp');
    this.xpCompare.player2 = this.user.getPropertyNb('xp');
  }
}
