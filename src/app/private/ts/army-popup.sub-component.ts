import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'army-popup',
  templateUrl: '../html/army-popup.sub-component.html',
  styleUrls: ['../css/army-popup.sub-component.css']
})

export class ArmyPopup {
  @Input() info: any;
  
  public engagenb:any;
  public liberatenb:any;
  public rBuildNb:any;
  public rDestructNb:any;
  public rEngagePossible:number;
  public errorBuilding:number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.engagenb = '';
    this.liberatenb = '';
    this.rEngagePossible = 0;
    this.errorBuilding = 0;
    
    this.socket.socket.on('engagePossible', (nb:number) => {
      this.rEngagePossible = nb;
    });
    this.socket.socket.on('build', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.socket.on('destruct', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.socket.on('engage', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.socket.on('liberate', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
  }
  
  armyEngage() {
    let unit = this.info.code;
    let nb = this.engagenb;
    
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
    
    if(nb > 0) {
      var msg = {
        'unit': unit,
        'nb': nb
      };
      this.socket.emit("liberate", msg);
    }
  }
  
  setLiberate() {
    this.liberatenb = this.user.getPropertyNb(this.info.code);
  }
}
