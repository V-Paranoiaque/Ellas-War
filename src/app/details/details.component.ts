import { RouterModule } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { CommonModule } from '@angular/common';

import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

import questionCircle from '@iconify/icons-fa6-regular/circle-question';

@Component({
  templateUrl: './details.component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class DetailsComponent implements OnInit {
  user = inject(User);
  translate = inject(TranslateService);

  Tools = Tools;

  public nbvariation = {
    drachma: 0,
    food: 0,
    water: 0,
    wood: 0,
    iron: 0,
    stone: 0,
    marble: 0,
    grapes: 0,
    wine: 0,
    gold: 0,
  };
  public variation = {
    drachma: 0,
    food: 0,
    water: 0,
    wood: 0,
    iron: 0,
    stone: 0,
    marble: 0,
    grapes: 0,
    wine: 0,
    gold: 0,
  };
  public menuMode: number;

  questionCircle = questionCircle;

  constructor() {
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
    const buildingList = this.user.getBuildings();

    for (const i in buildingList) {
      if (
        this.user.getPropertyNb(buildingList[i].code) > 0 &&
        buildingList[i].consumption
      ) {
        const consumption = buildingList[i].consumption;
        for (const consum in consumption) {
          this.variation[consum as keyof typeof this.variation] -=
            consumption[consum as keyof typeof consumption] *
            this.user.getPropertyNb(buildingList[i].code);
          this.nbvariation[consum as keyof typeof this.nbvariation]++;
        }
      }
    }
  }

  defineRessBuildingsProd() {
    const buildingList = this.user.getBuildings();

    for (const i in buildingList) {
      if (this.user.getPropertyNb(buildingList[i].code) > 0) {
        if (buildingList[i].production) {
          const production = buildingList[i].production;
          for (const prod in buildingList[i].production) {
            this.variation[prod as keyof typeof this.variation] +=
              production[prod as keyof typeof production] *
              this.user.getPropertyNb(buildingList[i].code);
            this.nbvariation[prod as keyof typeof this.nbvariation]++;
          }
        }
      }
    }
  }

  defineRessArmy() {
    const armyList = this.user.getArmy();

    for (const i in armyList) {
      if (
        this.user.getPropertyNb(armyList[i].code) > 0 &&
        armyList[i].consumption
      ) {
        for (const consum in armyList[i].consumption) {
          const consumption = armyList[i].consumption;
          this.variation[consum as keyof typeof this.variation] -=
            consumption[consum as keyof typeof consumption] *
            this.user.getPropertyNb(armyList[i].code);
          this.nbvariation[consum as keyof typeof this.nbvariation]++;
        }
      }
    }
  }

  defineRessAlliance() {
    let name;
    for (const ress in this.variation) {
      name = 'tax_' + ress;

      if (this.user.getPropertyNb(name) > 0) {
        this.variation[ress as keyof typeof this.variation] -=
          this.user.getPropertyNb(name);
        this.nbvariation[ress as keyof typeof this.nbvariation]++;
      }
    }
  }

  getRess(object: object, ress: string) {
    if (object && object[ress as keyof object]) {
      return object[ress as keyof object];
    } else {
      return 0;
    }
  }
  getVariation(ress: string) {
    return this.variation[ress as keyof typeof this.variation];
  }

  setMenuMode(id: number) {
    this.menuMode = id;
  }
}
