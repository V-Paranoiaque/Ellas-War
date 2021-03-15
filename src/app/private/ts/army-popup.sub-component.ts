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
  
  Number =  Number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.engageNb = '';
    this.liberatenb = '';
    this.rEngageNb = 0;
    this.rEngagePossible = 0;
    this.rLiberateNb = 0;
    this.errorBuilding = 0;
    this.error = 0;
    
    this.socket.on('engagePossible', (nb:number) => {
      this.rEngagePossible = nb;
    });
    this.socket.on('build', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.on('destruct', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.on('engage', (nb:number) => {
      this.rEngageNb = nb;
      this.rLiberateNb = 0;
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.on('liberate', (nb:number) => {
      this.rEngageNb = 0;
      this.rLiberateNb = nb;
      this.socket.emit('engagePossible', this.info.code);
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('engagePossible');
    this.socket.removeListener('build');
    this.socket.removeListener('destruct');
    this.socket.removeListener('engage');
    this.socket.removeListener('liberate');
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
      
      this.engageNb = '';
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
  
  hasHosting() {
    if((this.info.placen && 
       ((this.user.getPropertyNb('placen')-this.user.getPropertyNb('placenactu')-(this.engageNb * this.info.placen) < 0) ||
         this.user.getPropertyNb('placen') == this.user.getPropertyNb('placenactu'))) ||
       (this.info.placep && 
       ((this.user.getPropertyNb('placep')-this.user.getPropertyNb('placepactu')-(this.engageNb * this.info.placep) < 0) ||
        this.user.getPropertyNb('placep') == this.user.getPropertyNb('placepactu'))) ||
       (this.info.placec && 
       ((this.user.getPropertyNb('placec')-this.user.getPropertyNb('placecactu')-(this.engageNb * this.info.placec) < 0) ||
        this.user.getPropertyNb('placec') == this.user.getPropertyNb('placecactu')))) {
      return false;
    }
    else {
      return true;
    }
  }
  
  missingResource() {
    let list = [];
    if(this.info.cost) {
      for(let id in environment.resources) {
        let res = environment.resources[id];
        if(this.info.cost[res] && 
           (this.info.cost[res] > this.user.getPropertyNb(res) || 
            this.info.cost[res]*this.engageNb > this.user.getPropertyNb(res))) {
          list.push(res);
        }
      }
    }
    return list;
  }
  
  setEngage(nb:number) {
    this.engageNb = nb;
  }
  
  setLiberate() {
    this.rEngageNb = 0;
    this.rLiberateNb = 0;
    this.liberatenb = this.user.getPropertyNb(this.info.code);
  }
}
