import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-army-summary-popup',
  templateUrl: '../html/army-summary-popup.sub-component.html'
})

export class ArmySummaryPopupSubComponent implements OnInit, OnDestroy {
  private army:any;
  private buildings:any;
  
  public defenseWallStrength:number;
  public wallDefense:number;
  
  Tools = Tools;
  
  shieldShaded = shieldShaded;
  swordIcon= swordIcon;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.defenseWallStrength = 0;
    this.wallDefense = 0;
  }
  
  ngOnInit(){
    this.army      = this.user.getArmy();
    this.buildings = this.user.getBuildings();
    
    this.socket.emit('defenseWallStrength');
    this.socket.emit('wallDefense');
    
    this.socket.on('defenseWallStrength', (data:number) => {
      this.defenseWallStrength = data;
    });
    this.socket.on('wallDefense', (data:number) => {
      this.wallDefense = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('defenseWallStrength');
    this.socket.removeListener('wallDefense');
  }
  
  getAttack() {
    let nb = 0;
    for(let i in this.army) {
      let unit = this.army[i];
      nb += this.user.getPropertyNb(unit.code)*unit.attack 
    }
    
    return nb;
  }
  
  getDefense() {
    let nb = 0;
    for(let i in this.army) {
      let unit = this.army[i];
      if(unit.defense) {
        nb += this.user.getPropertyNb(unit.code)*unit.defense; 
      }
    }
    for(let i in this.buildings) {
      let building = this.buildings[i];
      if(building.type == 2) {
        nb += this.user.getPropertyNb(building.code)*building.defense; 
      }
    }
    
    nb += this.defenseWallStrength;
    nb += this.wallDefense*this.user.getPropertyNb('poseidon_wall');
    
    return nb;
  }
}
