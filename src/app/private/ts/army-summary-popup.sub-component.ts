import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'army-summary-popup',
  templateUrl: '../html/army-summary-popup.sub-component.html'
})

export class ArmySummaryPopup {
  private army:any;
  private buildings:any;
  
  shieldShaded = shieldShaded;
  swordIcon= swordIcon;
  
  constructor(public user: User, public translate: TranslateService) {
    
  }
  
  ngOnInit(){
    this.army      = this.user.getArmy();
    this.buildings = this.user.getBuildings();
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
      nb += this.user.getPropertyNb(unit.code)*unit.defense; 
    }
    for(let i in this.buildings) {
      let building = this.buildings[i];
      if(building.type == 2) {
        nb += this.user.getPropertyNb(building.code)*building.defense; 
      }
    }
    
    return nb;
  }
}
