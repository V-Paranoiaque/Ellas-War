import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import { environment } from './../../../environments/environment';

import animalDog20Filled from '@iconify-icons/fluent/animal-dog-20-filled';
import bowAndArrow from '@iconify-icons/emojione-monotone/bow-and-arrow';
import footPrint from '@iconify-icons/mdi/foot-print';
import horseIcon from '@iconify-icons/mdi/horse';
import manSharp from '@iconify-icons/ion/man-sharp';
import questionCircle from '@iconify/icons-fa-regular/question-circle';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import {default as sword}  from '@iconify-icons/whh/sword';
import swordIcon from '@iconify/icons-vaadin/sword';


@Component({
  selector: 'app-army-popup',
  templateUrl: '../html/army-popup.sub-component.html',
  styleUrls: ['../css/army-popup.sub-component.css']
})

export class ArmyPopupSubComponent implements OnInit, OnDestroy {
  @Input() info: any;
  
  Number = Number;
  Object = Object;
  
  animalDog20Filled = animalDog20Filled;
  footPrint = footPrint;
  bowAndArrow = bowAndArrow;
  horseIcon = horseIcon;
  manSharp = manSharp;
  questionCircle = questionCircle;
  shieldShaded = shieldShaded;
  sword = sword;
  swordIcon= swordIcon;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
  }
  
  ngOnInit() {
    this.socket.on('engagePossible', (nb:number) => {
      this.info.rEngagePossible = nb;
    });
    this.socket.on('freeUnits', (nb:number) => {
      this.info.free = nb;
    });
    this.socket.on('build', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.on('destruct', () => {
      this.socket.emit('engagePossible', this.info.code);
      this.socket.emit('freeUnits', this.info.code);
    });
    this.socket.on('engage', (nb:number) => {
      this.info.rEngageNb = nb;
      this.info.rLiberateNb = 0;
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.on('liberate', (nb:number) => {
      this.info.rEngageNb = 0;
      this.info.rLiberateNb = nb;
      this.socket.emit('engagePossible', this.info.code);
      this.socket.emit('freeUnits', this.info.code);
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('engagePossible');
    this.socket.removeListener('freeUnits');
    this.socket.removeListener('build');
    this.socket.removeListener('destruct');
    this.socket.removeListener('engage');
    this.socket.removeListener('liberate');
  }
  
  armyEngage() {
    let unit = this.info.code;
    let nb = this.info.engageNb;
    this.info.rEngageNb = 0;
    this.info.rLiberateNb = 0;
    this.info.error = 0;
    
    if(nb == '' || nb == null) {
      this.info.error = 1;
    }
    
    if(nb > 0) {
      var msg = {
        'unit': unit,
        'nb': nb
      };
      
      this.info.engageNb = '';
      this.socket.emit('engage', msg);
    }
  }
  
  armyLiberate() {
    let unit = this.info.code;
    let nb = this.info.liberatenb;
    this.info.rEngageNb = 0;
    this.info.rLiberateNb = 0;
    this.info.error = 0;
    
    if(nb == '' || nb == null) {
      this.info.error = 1;
    }
    
    if(nb > 0) {
      var msg = {
        'unit': unit,
        'nb': nb
      };
      this.socket.emit('liberate', msg);
    }
  }
  
  hasHosting() {
    if((this.info.placen && 
       ((this.user.getPropertyNb('placen')-this.user.getPropertyNb('placenactu')-(this.info.engageNb * this.info.placen) < 0) ||
         this.user.getPropertyNb('placen') == this.user.getPropertyNb('placenactu'))) ||
       (this.info.placep && 
       ((this.user.getPropertyNb('placep')-this.user.getPropertyNb('placepactu')-(this.info.engageNb * this.info.placep) < 0) ||
        this.user.getPropertyNb('placep') == this.user.getPropertyNb('placepactu'))) ||
       (this.info.placec && 
       ((this.user.getPropertyNb('placec')-this.user.getPropertyNb('placecactu')-(this.info.engageNb * this.info.placec) < 0) ||
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
            this.info.cost[res]*this.info.engageNb > this.user.getPropertyNb(res))) {
          list.push(res);
        }
      }
    }
    return list;
  }
  
  setEngage(nb:number) {
    this.info.engageNb = nb;
  }
  
  setLiberate() {
    this.info.rEngageNb = 0;
    this.info.rLiberateNb = 0;
    this.info.liberatenb = this.user.getPropertyNb(this.info.code);
  }
}
