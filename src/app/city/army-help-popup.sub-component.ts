import { Component } from '@angular/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';

import bowAndArrow from '@iconify-icons/emojione-monotone/bow-and-arrow';
import footPrint from '@iconify-icons/mdi/foot-print';
import horseIcon from '@iconify-icons/mdi/horse';
import manSharp from '@iconify-icons/ion/man-sharp';
import minotaurIcon from '@iconify/icons-game-icons/minotaur';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import { default as sword } from '@iconify-icons/whh/sword';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-army-help-popup',
  templateUrl: './army-help-popup.sub-component.html',
})
export class ArmyHelpPopupSubComponent {
  Tools = Tools;

  minotaurIcon = minotaurIcon;
  footPrint = footPrint;
  bowAndArrow = bowAndArrow;
  horseIcon = horseIcon;
  manSharp = manSharp;
  shieldShaded = shieldShaded;
  sword = sword;
  swordIcon = swordIcon;

  groupList: number[];
  selectedGroup: number;

  constructor(public user: User) {
    this.groupList = [];
    for (let i = 1; i <= 8; i++) {
      this.groupList.push(i);
    }
    this.selectedGroup = 0;
  }

  getGroupBonus(i: number) {
    const res: number[] = [];
    const bonusList = this.user.getDatas().attack.bonus;
    if (
      this.user.getDatas().attack &&
      bonusList[(i + '') as keyof typeof bonusList]
    ) {
      for (const j in bonusList[(i + '') as keyof typeof bonusList]) {
        res.push(parseInt(j));
      }
    }
    return res;
  }

  selectGroup(id: number) {
    this.selectedGroup = id;
  }
}
