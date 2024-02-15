import { Component } from '@angular/core';
import { UserComponent as User } from 'src/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { SocketComponent as Socket } from '../../services/socketio.service';

import { environment } from '../../environments/environment';

import angleDown from '@iconify/icons-fa6-solid/angle-down';
import angleUp from '@iconify/icons-fa6-solid/angle-up';
import cog from '@iconify/icons-fa6-solid/gear';
import crown from '@iconify/icons-fa6-solid/crown';
import equals from '@iconify/icons-fa6-solid/equals';
import greekcolumnIcon from '@iconify/icons-whh/greekcolumn';
import landFields from '@iconify/icons-mdi/land-fields';
import powerOff from '@iconify/icons-fa6-solid/power-off';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import swordIcon from '@iconify/icons-vaadin/sword';
import trophy from '@iconify/icons-fa6-solid/trophy';

@Component({
  selector: 'app-main-private-right-menu',
  templateUrl: './main-private-right-menu.sub-component.html',
  styleUrls: ['./main-private.component.css'],
})
export class MainPrivateRightMenuSubComponent {
  public ressList: string[];
  public selectedWeather: string;
  public xpCompare: {
    player1: number;
    player2: number;
  };

  //Icons
  angleDown = angleDown;
  angleUp = angleUp;
  cog = cog;
  crown = crown;
  equals = equals;
  greekcolumnIcon = greekcolumnIcon;
  landFields = landFields;
  powerOff = powerOff;
  questionCircle = questionCircle;
  swordIcon = swordIcon;
  trophy = trophy;

  constructor(
    public user: User,
    public translate: TranslateService,
    public socket: Socket
  ) {
    this.ressList = environment.resources;
    this.selectedWeather = user.getConfig().weather;
    this.xpCompare = {
      player1: this.user.getPropertyNb('xp'),
      player2: this.user.getPropertyNb('xp'),
    };
  }

  selectWeather(name: string) {
    this.selectedWeather = name;
  }

  canEnable() {
    const weather_cost = this.user.getDatas().weather_cost;
    for (const i in weather_cost) {
      if (
        this.user.getPropertyNb(i) <
        (weather_cost[i as keyof typeof weather_cost] as number)
      ) {
        return false;
      }
    }
    return true;
  }

  getPrice() {
    const weather_cost = this.user.getDatas().weather_cost;
    const list = [];
    for (const i in weather_cost) {
      list.push({
        res: i,
        nb: weather_cost[i as keyof typeof weather_cost] as number,
      });
    }
    return list;
  }

  weatherDisable() {
    this.socket.emit('weatherDisable');
  }

  weatherDisableCancel() {
    this.socket.emit('weatherDisableCancel');
  }

  disconnect() {
    this.user.disconnect();
  }

  getVariation(res: string) {
    const variation = this.user.getProperty('var_ress') as object;
    return variation[res as keyof typeof variation];
  }

  getRes(resName: string) {
    const res = this.user.getPropertyNb(resName);

    if (res >= 100000000) {
      return Math.ceil(res);
    }
    return res;
  }

  xpHelpInit() {
    this.xpCompare.player1 = this.user.getPropertyNb('xp');
    this.xpCompare.player2 = this.user.getPropertyNb('xp');
  }
}
