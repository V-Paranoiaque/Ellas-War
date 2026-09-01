import { Component, inject} from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LocaleService } from '../../services/locale.service';
import { environment } from '../../environments/environment';
import { EwIconSubComponent } from '../../services/ew-icon.service';
import { IcIconComponent } from '../../services/ic-icon.service';
import { IdToWeatherSubComponent } from './id-to-weather.sub-component';

import angleDown from '@iconify/icons-fa6-solid/angle-down';
import angleUp from '@iconify/icons-fa6-solid/angle-up';
import equals from '@iconify/icons-fa6-solid/equals';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';

@Component({
  selector: 'app-main-private-player-info-popup',
  templateUrl: './main-private-player-info-popup.sub-component.html',
  styleUrls: ['./main-private.component.css'],
  imports: [
    CommonModule,
    EwIconSubComponent,
    IdToWeatherSubComponent,
    IcIconComponent,
    RouterModule,
    TranslateDirective,
    TranslatePipe,
  ],
})
export class MainPrivatePlayerInfoPopupSubComponent {
  user = inject(User);
  translate = inject(TranslateService);
  readonly currentLocale = inject(LocaleService).currentLocale;

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

  constructor() {
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
