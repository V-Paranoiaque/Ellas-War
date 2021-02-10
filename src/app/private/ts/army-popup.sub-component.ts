import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
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
  public errorBuilding:number;
  
  constructor(private socket: Socket, public user: User) {
    this.engagenb = '';
    this.liberatenb = '';
    this.errorBuilding = 0;
    
    if(this.info) {
      this.socket.emit('buildPossible', this.info.code);
    }
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
}
