import { Component } from '@angular/core';
import { UserComponent as User } from '../../../services/user.service';

import animalDog20Filled from '@iconify-icons/fluent/animal-dog-20-filled';
import bowAndArrow from '@iconify-icons/emojione-monotone/bow-and-arrow';
import footPrint from '@iconify-icons/mdi/foot-print';
import horseIcon from '@iconify-icons/mdi/horse';
import manSharp from '@iconify-icons/ion/man-sharp';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import {default as sword}  from '@iconify-icons/whh/sword';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-army-help-popup',
  templateUrl: '../html/army-help-popup.sub-component.html'
})

export class ArmyHelpPopupSubComponent {

  animalDog20Filled = animalDog20Filled;
  footPrint = footPrint;
  bowAndArrow = bowAndArrow;
  horseIcon = horseIcon;
  manSharp = manSharp;
  shieldShaded = shieldShaded;
  sword = sword;
  swordIcon= swordIcon;
  
  groupList:any;
  selectedGroup:number;
  
  constructor(public user: User) {
    this.groupList = [];
    for(let i =1; i<= 8; i++) {
      this.groupList.push(i);
    }
    this.selectedGroup = 0;
  }
  
  getGroupBonus(i:number) {
    let res:number[];
    res = [];
    if(this.user.info.datas.attack) {
      for(let j in this.user.info.datas.attack.bonus[i+'']) {
        res.push(parseInt(j));
      }
    }
    return res;
  }
  
  selectGroup(id:number) {
    this.selectedGroup = id;
  }
}
