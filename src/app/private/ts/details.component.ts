import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  templateUrl: '../html/details.component.html',
  styleUrls: ['../css/details.component.css']
})

export class DetailsComponent implements OnInit {

  public nbvariation:any;
  public variation:any;
  public menuMode:number;
  
  questionCircle = questionCircle;
  
  constructor(public user: User, public translate: TranslateService) {
    this.variation = {
      'drachma': 0,
      'food': 0,
      'water': 0,
      'wood': 0,
      'iron': 0,
      'stone': 0,
      'marble': 0,
      'grapes': 0,
      'wine': 0,
      'gold': 0
    };
    this.nbvariation = {
      'drachma': 0,
      'food': 0,
      'water': 0,
      'wood': 0,
      'iron': 0,
      'stone': 0,
      'marble': 0,
      'grapes': 0,
      'wine': 0,
      'gold': 0
    };
    /**
     * 0: Production
     * 1: Comsumption
     * 2: Evolution
     **/
    this.menuMode = 2;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    //Process the productions/consumptions
    this.defineRessBuildingsConso();
    this.defineRessBuildingsProd();
    this.defineRessArmy();
    this.defineRessAlliance();
  }
  
  defineRessBuildingsConso() {
    let buildingList = this.user.getBuildings();
    
    for (let i in buildingList) {
      if(this.user.getPropertyNb(buildingList[i].code) > 0) {
        if(buildingList[i].consumption) {
          for(let consum in buildingList[i].consumption) {
            this.variation[consum] -= (buildingList[i].consumption[consum] * this.user.getPropertyNb(buildingList[i].code));
            this.nbvariation[consum]++;
          }
        }
      }
    }
  }
  
  defineRessBuildingsProd() {
    let buildingList = this.user.getBuildings();
    
    for (let i in buildingList) {
      if(this.user.getPropertyNb(buildingList[i].code) > 0) {
        if(buildingList[i].production) {
          for(let prod in buildingList[i].production) {
            this.variation[prod] += (buildingList[i].production[prod] * this.user.getPropertyNb(buildingList[i].code));
            this.nbvariation[prod]++;
          }
        }
      }
    }
  }
  
  defineRessArmy() {
    let armyList    = this.user.getArmy();
    
    for (let i in armyList) {
      if(this.user.getPropertyNb(armyList[i].code) > 0 && armyList[i].consumption) {
        for(let consum in armyList[i].consumption) {
          this.variation[consum] -= (armyList[i].consumption[consum] * this.user.getPropertyNb(armyList[i].code));
          this.nbvariation[consum]++;
        }
      }
    }
  }
  
  defineRessAlliance() {
    let name;
    for(let ress in this.variation) {
      name = 'tax_'+ress;
      
      if(this.user.getPropertyNb(name) > 0) {
        this.variation[ress] -= this.user.getPropertyNb(name);
        this.nbvariation[ress]++;
      }
    }
  }
  
  getRess(object:any, ress:any) {
    if(object && object[ress]) {
      return object[ress]
    }
    else {
      return 0;
    }
  }
  getVariation(ress:any) {
    return this.variation[ress];
  }
  
  setMenuMode(id:number) {
    this.menuMode = id;
  }
}
