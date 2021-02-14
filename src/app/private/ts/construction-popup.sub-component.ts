import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'construction-popup',
  templateUrl: '../html/construction-popup.sub-component.html',
  styleUrls: ['../css/construction-popup.sub-component.css']
})

export class ConstructionPopup {
  @Input() info: any;
  
  public buildnb:any;
  public destructnb:any;
  public rBuildNb:any;
  public rDestructNb:any;
  public errorBuilding:number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.buildnb = '';
    this.destructnb = '';
    this.errorBuilding = 0;
    
    if(this.info) {
      this.socket.emit('buildPossible', this.info.code);
    }
  }
  
  buildingBuild() {
    let building = this.info.code;
    let nb = this.buildnb;
    
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
    let nb = this.destructnb;
    
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
}
