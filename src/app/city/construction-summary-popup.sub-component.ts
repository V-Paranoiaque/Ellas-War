import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';

@Component({
  selector: 'app-construction-summary-popup',
  templateUrl: './construction-summary-popup.sub-component.html',
})
export class ConstructionSummaryPopupSubComponent {
  Tools = Tools;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {}

  getField() {
    let field = 0;

    for (const [, building] of Object.entries(this.user.getBuildings())) {
      field += this.user.getPropertyNb(building.code) * building.field;
    }

    field +=
      this.getTempleField().temple1.field *
      (this.user.getPropertyNb('hermes') +
        this.user.getPropertyNb('apollo') +
        this.user.getPropertyNb('demeter'));
    field +=
      this.getTempleField().temple2.field *
      (this.user.getPropertyNb('ares') + this.user.getPropertyNb('athena'));
    field +=
      this.getTempleField().temple3.field *
      (this.user.getPropertyNb('artemis') +
        this.user.getPropertyNb('dionysus') +
        this.user.getPropertyNb('hephaestus'));
    field +=
      this.getTempleField().temple4.field *
      (this.user.getPropertyNb('zeus') +
        this.user.getPropertyNb('hades') +
        this.user.getPropertyNb('poseidon'));

    return field;
  }

  getProdField() {
    let field = 0;

    for (const [, building] of Object.entries(this.user.getBuildings())) {
      if (building.type === 1 && this.user.getPropertyNb(building.code) > 0) {
        field = field + building.field * this.user.getPropertyNb(building.code);
      }
    }

    return field;
  }

  getTempleField() {
    const data = this.user.getDatas();
    if (data?.temples) {
      return data.temples;
    } else {
      return {
        temple1: { field: 0 },
        temple2: { field: 0 },
        temple3: { field: 0 },
        temple4: { field: 0 },
      };
    }
  }
}
