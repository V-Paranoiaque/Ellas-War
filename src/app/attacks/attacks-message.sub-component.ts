import { Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { MessageContent } from 'src/services/message.class';

@Component({
  selector: 'app-attacks-message',
  templateUrl: './attacks-message.sub-component.html',
  styleUrls: ['./attacks.component.css'],
})
export class AttacksMessageSubComponent {
  @Input() info!: MessageContent['content'];
  public resources: string[];

  Object = Object;
  Tools = Tools;

  constructor(
    public user: User,
    public translate: TranslateService
  ) {
    this.resources = environment.resources;
  }

  getLostStoreroom() {
    const list = [];

    if (this.info.lost_storeroom) {
      for (const code in this.info.lost_storeroom) {
        if (this.info.lost_storeroom[code as keyof object] > 0) {
          list.push({
            res_id: code,
            quantity: this.info.lost_storeroom[code as keyof object],
          });
        }
      }
    }

    return list;
  }

  getLostBuildings() {
    const list = [];

    if (this.info.lost_build) {
      const datas = this.user.getProperty('datas') as { building: object };
      for (const code in this.info.lost_build) {
        if (
          !datas?.building[code as keyof typeof datas.building] ||
          this.info.lost_build[code as keyof object] === 0
        ) {
          continue;
        }
        list.push({
          code: code,
          nb: this.info.lost_build[code as keyof object],
        });
      }
    }

    return list;
  }

  getSentUnits() {
    let listUnits: object = {};
    const list = [];

    for (const i in this.info.unitSend) {
      if (!i) {
        continue;
      }

      listUnits = Tools.addToObject(listUnits, this.info.unitSend[i]);
    }

    for (const i in listUnits) {
      const nb = parseInt(listUnits[i as keyof typeof listUnits]);
      if (nb > 0) {
        list.push({
          code: i,
          nb: nb,
        });
      }
    }

    return list;
  }

  getAttackLost() {
    let listUnits: object = {};
    const list = [];

    for (const i in this.info.lost_wall_unit) {
      if (!i) {
        continue;
      }

      listUnits = Tools.addToObject(listUnits, this.info.lost_wall_unit[i]);
    }
    for (const i in this.info.unitAttackLost) {
      if (!i) {
        continue;
      }
      listUnits = Tools.addToObject(listUnits, this.info.unitAttackLost[i]);
    }

    for (const i in listUnits) {
      const nb = parseInt(listUnits[i as keyof typeof listUnits]);
      if (nb > 0) {
        list.push({
          code: i,
          nb: nb,
        });
      }
    }

    return list;
  }

  getDefenseLost() {
    let listUnits: object = {};
    const list = [];

    for (const i in this.info.unitDefenseLost) {
      listUnits = Tools.addToObject(listUnits, this.info.unitDefenseLost[i]);
    }

    for (const i in listUnits) {
      const nb = parseInt(listUnits[i as keyof typeof listUnits]);
      if (nb > 0) {
        list.push({
          code: i,
          nb: nb,
        });
      }
    }

    return list;
  }

  getSaved() {
    if (!this.info.saved_attack) {
      return [];
    }

    const list = [];

    for (const code in this.info.saved_attack) {
      if (this.info.saved_attack[code as keyof object] > 0) {
        list.push({
          code: code,
          nb: this.info.saved_attack[code as keyof object],
        });
      }
    }

    return list;
  }

  getSavedRes() {
    const list = [];

    if (this.info.ress_def) {
      for (const code in this.info.ress_def) {
        if (this.info.ress_def[code as keyof object]! > 0) {
          list.push({
            res_id: code,
            quantity: this.info.ress_def[code as keyof object],
          });
        }
      }
    }

    return list;
  }

  getSavedOther() {
    if (!this.info.saved_defense) {
      return 0;
    }
    return this.info.saved_defense;
  }

  getLostRes() {
    const data: { code: string; nb: number }[] = [];
    for (const [res, nb] of Object.entries(this.info.lost_ress)) {
      if (nb <= 0) {
        continue;
      }
      data.push({
        code: res,
        nb: nb,
      });
    }
    return data;
  }

  getCorruptedRes() {
    const data: { code: string; nb: number }[] = [];
    if (this.info.sanctuary2 && Object.keys(this.info.sanctuary2).length > 0) {
      for (const [res, nb] of Object.entries(this.info.sanctuary2)) {
        data.push({
          code: res,
          nb: parseInt(nb as string),
        });
      }
    }
    return data;
  }
}
