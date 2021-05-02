import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-units.component.html'
})

export class AdminUnits {
  public armyArray:any;
  private priceList:any
  
  constructor(public user: User, public translate: TranslateService) {
    this.priceList = {
      'drachma': 1,
      'food': 0.11,
      'water': 0.078,
      'wood': 0.276,
      'iron': 0.147,
      'stone': 0.799,
      'marble': 396.999,
      'grapes': 0.967,
      'wine': 1350,
      'gold': 1493
    }
  }
  
  ngOnInit() {
    this.calculate();
  }
  
  calculate() {
    this.armyArray = [];
    
    for(let i in this.user.info.datas.army) {
      let unit = this.user.info.datas.army[i];
      //Ignore units who don't attack
      if(!unit.attack) {
        continue;
      }
      
      unit.globalCost = 0;
      unit.globalConsu = 0;
      for(let res in unit.cost) {
        unit.globalCost += unit.cost[res]*this.priceList[res];
      }
      for(let res in unit.consumption) {
        unit.globalConsu += unit.consumption[res]*this.priceList[res];
      }
      
      this.armyArray.push(Object.assign({}, unit));
    }
    
    for(let i in this.user.info.datas.building) {
      let building = this.user.info.datas.building[i];
      
      //Keep just towers
      if(building.type != 2) {
        continue;
      }
      
      building.globalCost = 0;
      building.globalConsu = 0;
      for(let res in building.cost) {
        building.globalCost += building.cost[res]*this.priceList[res];
      }
      for(let res in building.consumption) {
        building.globalConsu += building.consumption[res]*this.priceList[res];
      }
      
      this.armyArray.push(Object.assign({}, building));
    }
  }
}
