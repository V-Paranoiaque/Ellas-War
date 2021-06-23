import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-units.component.html'
})

export class AdminUnits {
  public armyArray:any;
  public armyFirst:any;
  public towersArray:any;
  public data:any;
  private priceHosting:any;
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
    this.user.checkPermissions([1]);
    
    this.armyFirst = [];
    
    //Easier to make a local copy to run tests
    this.data = this.user.info.datas;
    
    if(Object.keys(this.data).length > 0) {
      this.calculateHosting();
      this.calculateArmy();
      this.calculateArmyFirst();
      this.calculateTowers();
    }
  }
  
  calculateArmy() {
    this.armyArray = [];
    
    for(let i in this.data.army) {
      let unit = this.data.army[i];
      
      //Ignore units who don't attack
      if(!unit.attack) {
        continue;
      }
      
      unit.code = i;
      unit.globalCost = 0;
      unit.globalConsu = 0;
      for(let res in unit.cost) {
        unit.globalCost += unit.cost[res]*this.priceList[res];
      }
      for(let res in unit.consumption) {
        unit.globalConsu += unit.consumption[res]*this.priceList[res];
      }
      
      if(unit.placen && unit.placen > 0) {
        unit.field = this.data.building.habitation.placen/
                     this.data.building.habitation.field;
        unit.globalCost += this.priceHosting.habitation;
      }
      else if(unit.placep && unit.placep > 0) {
        unit.field = this.data.building.palace.placep/
                     this.data.building.palace.field;
        unit.globalCost += this.priceHosting.palace;
      }
      else if(unit.placec && unit.placec > 0) {
        unit.field = this.data.building.cursedcave.placec/
                     this.data.building.cursedcave.field;
        unit.globalCost += this.priceHosting.cursedcave;
      }
      else {
        unit.field = 0;
        unit.a_f   = 0;
        unit.d_f   = 0;
      }
      
      if(unit.attack > 0) {
        unit.p_a = unit.globalCost/unit.attack;
        unit.c_a = unit.globalConsu/unit.attack;
      }
      else {
        unit.p_a = 0;
        unit.c_a = 0;
      }
      
      unit.p_d = unit.globalCost/unit.defense;
      unit.c_d = unit.globalConsu/unit.defense;
      
      
      if(unit.field > 0) {
        unit.a_f = unit.globalCost/unit.field;
        unit.d_f = unit.defense/unit.field;
      }
      
      this.armyArray.push(Object.assign({}, unit));
    }
  }
  
  calculateArmyFirst() {
    let max = 9999999;
    let min = 0;
    for(let i=1; i<=8; i++) {
      this.armyFirst[i] = {
        'p_a': {'unit': '', value: max},
        'p_d': {'unit': '', value: max},
        'c_a': {'unit': '', value: max},
        'c_d': {'unit': '', value: max},
        'a_f': {'unit': '', value: min},
        'd_f': {'unit': '', value: min},
      }
    }
    
    for(let i in this.armyArray) {
      let unit = this.armyArray[i];
      
      //Remove units that can't be hired
      if(unit.lvlmini > 10) {
        continue;
      }
      
      if(unit.p_a > 0 && unit.p_a < this.armyFirst[unit.type].p_a.value) {
        this.armyFirst[unit.type].p_a = {
          'unit': unit.code,
          'value': unit.p_a
        }
      }
      if(unit.p_d < this.armyFirst[unit.type].p_d.value) {
        this.armyFirst[unit.type].p_d = {
          'unit': unit.code,
          'value': unit.p_d
        }
      }
      if(unit.c_a > 0 && unit.c_a < this.armyFirst[unit.type].c_a.value) {
        this.armyFirst[unit.type].c_a = {
          'unit': unit.code,
          'value': unit.c_a
        }
      }
      if(unit.c_d > 0 && unit.c_d < this.armyFirst[unit.type].c_d.value) {
        this.armyFirst[unit.type].c_d = {
          'unit': unit.code,
          'value': unit.c_d
        }
      }
      if(unit.a_f > this.armyFirst[unit.type].a_f.value) {
        this.armyFirst[unit.type].a_f = {
          'unit': unit.code,
          'value': unit.a_f
        }
      }
      if(unit.d_f > this.armyFirst[unit.type].d_f.value) {
        this.armyFirst[unit.type].d_f = {
          'unit': unit.code,
          'value': unit.d_f
        }
      }
    }
  }
  
  calculateHosting() {
    this.priceHosting = {
      'habitation': 0,
      'palace': 0,
      'cursedcave': 0
    };
    
    for(let building in this.priceHosting) {
      for(let res in this.data.building[building].cost) {
        this.priceHosting[building] += this.data.building[building].cost[res]*
                                       this.priceList[res];
      }
    }
    
    this.priceHosting.habitation /= this.data.building.habitation.placen;
    this.priceHosting.palace     /= this.data.building.palace.placep;
    this.priceHosting.cursedcave /= this.data.building.cursedcave.placec;
  }
  
  calculateTowers() {
    this.towersArray = [];
    
    for(let i in this.data.building) {
      let building = this.data.building[i];
      
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
      
      //Use a fake type, 9
      building.type = 9;
      
      this.towersArray.push(Object.assign({}, building));
    }
  }
  
  checkBest(attr:string, unit:any) {
    if(this.armyFirst[unit.type][attr].unit == unit.code) {
      return true;
    }
    else {
      return false;
    }
  }
}
