import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from 'src/services/message.class';

@Component({
  selector: 'app-lost-message',
  templateUrl: './lost-message.sub-component.html',
})
export class LostMessageSubComponent {
  @Input() info!: MessageContent['content'];

  Tools = Tools;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {}

  getLostBuildings() {
    const list = [];

    if (this.info.lost_build) {
      for (const [i, nb] of Object.entries(this.info.lost_build)) {
        if (nb > 0) {
          list.push({
            code: i,
            nb: nb,
          });
        }
      }
    }
    return list;
  }

  getLostBuildingsNb() {
    if (this.info.lost_build) {
      let i = 0;
      for (const [, qtt] of Object.entries(this.info.lost_build)) {
        if (qtt > 0) {
          i++;
        }
      }
      return i;
    } else {
      return 0;
    }
  }

  getLostResources() {
    const list = [];

    if (this.info.lost_ress) {
      for (const [i, nb] of Object.entries(this.info.lost_ress)) {
        if (nb > 0) {
          list.push({
            code: i,
            nb: nb,
          });
        }
      }
    }
    return list;
  }

  getLostResourcesNb() {
    if (this.info.lost_ress) {
      let i = 0;
      for (const [, qtt] of Object.entries(this.info.lost_ress)) {
        if (qtt > 0) {
          i++;
        }
      }
      return i;
    } else {
      return 0;
    }
  }

  getLostUnits() {
    const list = [];

    if (this.info.lost_unit) {
      for (const [i, nb] of Object.entries(this.info.lost_unit)) {
        if (parseInt(nb as string) > 0) {
          list.push({
            code: i,
            nb: parseInt(nb as string),
          });
        }
      }
    }
    return list;
  }
  getLostUnitsNb() {
    if (this.info.lost_unit) {
      return Object.keys(this.info.lost_unit).length;
    } else {
      return 0;
    }
  }
}
