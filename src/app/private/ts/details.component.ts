import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';

import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  templateUrl: '../html/details.component.html',
  styleUrls: ['../css/details.component.css']
})

export class DetailsComponent implements OnInit {
  Tools = Tools;
  
  public nbvariation = {
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
  public variation = {
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
  public menuMode:number;
  
  questionCircle = questionCircle;
  
  constructor(public user: User, public translate: TranslateService) {
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
            this.variation[consum as keyof typeof this.variation] -= (buildingList[i].consumption[consum] * this.user.getPropertyNb(buildingList[i].code));
            this.nbvariation[consum as keyof typeof this.nbvariation]++;
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
            this.variation[prod as keyof typeof this.variation] += (buildingList[i].production[prod] * this.user.getPropertyNb(buildingList[i].code));
            this.nbvariation[prod as keyof typeof this.nbvariation]++;
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
          this.variation[consum as keyof typeof this.variation] -= (armyList[i].consumption[consum] * this.user.getPropertyNb(armyList[i].code));
          this.nbvariation[consum as keyof typeof this.nbvariation]++;
        }
      }
    }
  }
  
  defineRessAlliance() {
    let name;
    for(let ress in this.variation) {
      name = 'tax_'+ress;
      
      if(this.user.getPropertyNb(name) > 0) {
        this.variation[ress as keyof typeof this.variation] -= this.user.getPropertyNb(name);
        this.nbvariation[ress as keyof typeof this.nbvariation]++;
      }
    }
  }
  
  getRess(object:object, ress:string) {
    if(object && object[ress as keyof object]) {
      return object[ress as keyof object]
    }
    else {
      return 0;
    }
  }
  getVariation(ress:string) {
    return this.variation[ress as keyof typeof this.variation];
  }
  
  setMenuMode(id:number) {
    this.menuMode = id;
  }
}
