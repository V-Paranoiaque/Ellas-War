import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'construction-popup',
  templateUrl: '../html/construction-popup.sub-component.html',
  styleUrls: ['../css/construction-popup.sub-component.css']
})

export class ConstructionPopup {
  @Input() info: any;
  
  Number =  Number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.socket.on('buildPossible', (nb:number) => {
      this.info.rBuildPossible = nb;
    });
    this.socket.on('build', (nb:number) => {
      this.info.rBuildNb = nb;
      this.info.rDestructNb = '';
      
      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.on('destruct', (nb:number) => {
      this.info.rBuildNb = '';
      this.info.rDestructNb = nb;
    
      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.on('engage', () => {
      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.on('liberate', () => {
      this.socket.emit('buildPossible', this.info.code);
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('buildPossible');
    this.socket.removeListener('build');
    this.socket.removeListener('destruct');
    this.socket.removeListener('engage');
    this.socket.removeListener('liberate');
  }
  
  buildingBuild() {
    let building = this.info.code;
    let nb = this.info.buildNb;
    
    this.info.rBuildNb = '';
    this.info.rDestructNb = '';
    
    if(!nb) {
      this.info.errorBuilding = 1;
    }
    else {
      this.info.errorBuilding = 0;
    }
    
    if(nb > 0) {
      var msg = {
        'building': building,
        'nb': nb
      };
      
      this.socket.emit("build", msg);
    }
  }
  
  buildingDestruct() {
    let building = this.info.code;
    let nb = this.info.destructNb;
    
    this.info.rBuildNb = '';
    this.info.rDestructNb = '';
    
    if(!nb) {
      this.info.errorBuilding = 1;
    }
    else {
      this.info.errorBuilding = 0;
    }
    
    if(nb > 0) {
      var msg = {
        'building': building,
        'nb': nb
      };
      this.socket.emit("destruct", msg);
    }
  }
  
  getConsumption() {
    let list = [];
    for(let i in this.info.consumption) {
      list.push({
        'code': i,
        'nb': this.info.consumption[i]
      });
    }
    return list;
  }
  
  getProduction() {
    let list = [];
    for(let i in this.info.production) {
      list.push({
        'code': i,
        'nb': this.info.production[i]
      });
    }
    return list;
  }
  
  missingResource() {
    let list = [];
    if(this.info.cost) {
      for(let id in environment.resources) {
        let res = environment.resources[id];
        if(this.info.cost[res] && 
           (this.info.cost[res] > this.user.getPropertyNb(res) || 
            this.info.cost[res]*this.info.buildNb > this.user.getPropertyNb(res))) {
          list.push(res);
        }
      }
    }
    return list;
  }
  
  setBuild(nb:number) {
    this.info.buildNb = nb;
  }
  
  setDestruct() {
    this.info.destructNb = this.user.getPropertyNb(this.info.code);
  }
  
  updateCamp(){
    this.socket.emit('updateCamp');
  }
}
