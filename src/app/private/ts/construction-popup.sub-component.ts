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
  
  public buildNb:any;
  public destructNb:any;
  public rBuildNb:any;
  public rDestructNb:any;
  public rBuildPossible:number;
  public errorBuilding:number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.buildNb = '';
    this.destructNb = '';
    this.errorBuilding = 0;
    this.rBuildPossible = 0;
    
    this.socket.socket.on('buildPossible', (nb:number) => {
      this.rBuildPossible = nb;
    });
    this.socket.socket.on('build', (nb:number) => {
      this.rBuildNb = nb;
      this.rDestructNb = '';
      
      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.socket.on('destruct', (nb:number) => {
      this.rBuildNb = '';
      this.rDestructNb = nb;
    
      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.socket.on('engage', () => {
      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.socket.on('liberate', () => {
      this.socket.emit('buildPossible', this.info.code);
    });
  }
  
  buildingBuild() {
    let building = this.info.code;
    let nb = this.buildNb;
    
    this.rBuildNb = '';
    this.rDestructNb = '';
    
    if(!nb) {
      this.errorBuilding = 1;
    }
    else {
      this.errorBuilding = 0;
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
    let nb = this.destructNb;
    
    this.rBuildNb = '';
    this.rDestructNb = '';
    
    if(!nb) {
      this.errorBuilding = 1;
    }
    else {
      this.errorBuilding = 0;
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
            this.info.cost[res]*this.buildNb > this.user.getPropertyNb(res))) {
          list.push(res);
        }
      }
    }
    return list;
  }
  
  setBuild(nb:number) {
    this.buildNb = nb;
  }
  
  setDestruct() {
    this.destructNb = this.user.getPropertyNb(this.info.code);
  }
  
  updateCamp(){
    this.socket.emit('updateCamp');
  }
}
