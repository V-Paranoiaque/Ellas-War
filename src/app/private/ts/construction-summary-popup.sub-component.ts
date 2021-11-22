import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-construction-summary-popup',
  templateUrl: '../html/construction-summary-popup.sub-component.html'
})

export class ConstructionSummaryPopupSubComponent implements OnInit {
  private buildings:any;
  
  constructor(public user: User, public translate: TranslateService) {
    
  }
  
  ngOnInit(){
    this.buildings = this.user.getBuildings();
  }
  
  getField() {
    let field = 0;
    
    for(let i in this.buildings) {
      let building = this.buildings[i];
      field += this.user.getPropertyNb(building.code)*building.field; 
    }
    
    field += this.getTempleField().temple1.field*(
               this.user.getPropertyNb('hermes')+this.user.getPropertyNb('apollo')+this.user.getPropertyNb('demeter')
             )
    field += this.getTempleField().temple2.field*(
               this.user.getPropertyNb('ares')+this.user.getPropertyNb('athena')
             )
    field += this.getTempleField().temple3.field*(
               this.user.getPropertyNb('artemis')+this.user.getPropertyNb('dionysus')+this.user.getPropertyNb('hephaestus')
             )
    field += this.getTempleField().temple4.field*(
               this.user.getPropertyNb('zeus')+this.user.getPropertyNb('hades')+this.user.getPropertyNb('poseidon')
             )
    
    return field;
  }
  
  getProdField() {
    let field = 0;
    
    for(let i in this.buildings) {
      let building = this.buildings[i];
      if(building.type == 1 && this.user.getPropertyNb(building.code) > 0) {
        field = field + building.field*this.user.getPropertyNb(building.code);
      }
    }
    
    return field;
  }
  
  getTempleField() {
    let data = this.user.getDatas();
    if(data && data.temples) {
      return data.temples;
    }
    else {
      return {
        'temple1': 0,
        'temple2': 0,
        'temple3': 0,
        'temple4': 0
      }
    }
  }
}
