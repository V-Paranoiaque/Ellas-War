import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import { environment } from './../../../environments/environment';

import angleDown from '@iconify/icons-fa-solid/angle-down';
import angleUp from '@iconify/icons-fa-solid/angle-up';
import crown from '@iconify/icons-fa-solid/crown';
import questionCircle from '@iconify/icons-fa-regular/question-circle';
import equals from '@iconify/icons-fa-solid/equals';
import swordIcon from '@iconify/icons-vaadin/sword';
import trophy from '@iconify/icons-fa-solid/trophy';


@Component({
  selector: 'app-connected-right-menu',
  templateUrl: '../html/connected-right-menu.component.html',
  styleUrls: ['../css/connected-right-menu.component.css']
})

export class ConnectedRightMenuComponent {
  public selectedWeather:string;
  public ressList:any;
  
  //Icons
  angleDown      = angleDown;
  angleUp        = angleUp;
  crown          = crown;
  equals         = equals;
  questionCircle = questionCircle;
  swordIcon      = swordIcon;
  trophy         = trophy;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.selectedWeather = user.getConfig().weather;
    this.ressList = environment.resources;
  }
  
  selectWeather(name:string) {
    this.selectedWeather = name;
  }
  
  canEnable() {
    for(let i in this.user.getDatas().weather_cost) {
      if(this.user.getPropertyNb(i) < this.user.getDatas().weather_cost[i]) {
        return false;
      }
    }
    return true;
  }
  
  getPrice() {
    let list = [];
    
    for(let i in this.user.getDatas().weather_cost) {
      list.push({
        'res': i,
        'nb': this.user.getDatas().weather_cost[i]
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
}
