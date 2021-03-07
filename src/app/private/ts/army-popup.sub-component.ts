import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'army-popup',
  templateUrl: '../html/army-popup.sub-component.html',
  styleUrls: ['../css/army-popup.sub-component.css']
})

export class ArmyPopup {
  @Input() info: any;
  
  public engageNb:any;
  public liberatenb:any;
  public rBuildNb:any;
  public rDestructNb:any;
  public rEngageNb:number;
  public rEngagePossible:number;
  public rLiberateNb:number;
  public errorBuilding:number;
  public error:number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.engageNb = '';
    this.liberatenb = '';
    this.rEngageNb = 0;
    this.rEngagePossible = 0;
    this.rLiberateNb = 0;
    this.errorBuilding = 0;
    this.error = 0;
    
    this.socket.socket.on('engagePossible', (nb:number) => {
      this.rEngagePossible = nb;
    });
    this.socket.socket.on('build', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.socket.on('destruct', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.socket.on('engage', (nb:number) => {
      this.rEngageNb = nb;
      this.rLiberateNb = 0;
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.socket.on('liberate', (nb:number) => {
      this.rEngageNb = 0;
      this.rLiberateNb = nb;
      this.socket.emit('engagePossible', this.info.code);
    });
  }
  
  armyEngage() {
    let unit = this.info.code;
    let nb = this.engageNb;
    this.rEngageNb = 0;
    this.rLiberateNb = 0;
    this.error = 0;
    
    if(nb == '' || nb == null) {
      this.error = 1;
    }
    
    if(nb > 0) {
      var msg = {
        'unit': unit,
        'nb': nb
      };
      
      this.socket.emit("engage", msg);
    }
  }
  
  armyLiberate() {
    let unit = this.info.code;
    let nb = this.liberatenb;
    this.rEngageNb = 0;
    this.rLiberateNb = 0;
    this.error = 0;
    
    if(nb == '' || nb == null) {
      this.error = 1;
    }
    
    if(nb > 0) {
      var msg = {
        'unit': unit,
        'nb': nb
      };
      this.socket.emit("liberate", msg);
    }
  }
  
  missingResource() {
    let list = [];
    if(this.info.cost) {
      for(let res in environment.resources) {
        if(this.info.cost[res] && 
           (this.info.cost[res] > this.user.getPropertyNb(res) || this.info.cost.drachma*this.engageNb > this.user.getPropertyNb(res))) {
          list.push(res);
        }
      }
    }
    return list;
  }
  
  setLiberate() {
    this.rEngageNb = 0;
    this.rLiberateNb = 0;
    this.liberatenb = this.user.getPropertyNb(this.info.code);
  }
}
