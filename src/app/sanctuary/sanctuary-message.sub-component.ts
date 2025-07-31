import { Component, Input, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { MessageContent } from 'src/services/message.class';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sanctuary-message',
  templateUrl: './sanctuary-message.sub-component.html',
  imports: [CommonModule, TranslateModule],
})
export class SanctuaryMessageSubComponent {
  user = inject(User);
  translate = inject(TranslateService);

  @Input() info!: MessageContent['content'];
  Tools = Tools;

  getSentUnits() {
    const listUnits = new Map<string, number>();
    const list = [];

    for (const i in this.info.unitSend) {
      if (i) {
        for (const j in this.info.unitSend[i]) {
          if (!listUnits.get(j)) {
            listUnits.set(j, 0);
          }
          listUnits.set(j, listUnits.get(j)! + this.info.unitSend[i][j]);
        }
      }
    }

    for (const [unit, nb] of listUnits) {
      if (nb > 0) {
        list.push({
          code: unit,
          nb: nb,
        });
      }
    }

    return list;
  }

  getAttackLost() {
    const listUnits = new Map<string, number>();
    const list = [];

    for (const i in this.info.unitAttackLost) {
      if (i) {
        for (const j in this.info.unitAttackLost[i]) {
          if (!listUnits.get(j)) {
            listUnits.set(j, 0);
          }
          listUnits.set(j, listUnits.get(j)! + this.info.unitAttackLost[i][j]);
        }
      }
    }

    for (const [unit, nb] of listUnits) {
      if (nb > 0) {
        list.push({
          code: unit,
          nb: nb,
        });
      }
    }

    return list;
  }

  getDefenseLost() {
    const listUnits = new Map<string, number>();
    const list = [];

    for (const i in this.info.unitDefenseLost) {
      if (i) {
        for (const j in this.info.unitDefenseLost[i]) {
          if (!listUnits.get(j)) {
            listUnits.set(j, 0);
          }
          listUnits.set(j, listUnits.get(j)! + this.info.unitDefenseLost[i][j]);
        }
      }
    }

    for (const [unit, nb] of listUnits) {
      if (nb > 0) {
        list.push({
          code: unit,
          nb: nb,
        });
      }
    }

    return list;
  }

  getSanctuaryLost() {
    const listUnits = new Map<string, number>();
    const list = [];

    for (const i in this.info.sanctuary_lost) {
      for (const j in this.info.sanctuary_lost[i]) {
        if (!listUnits.get(j)) {
          listUnits.set(j, 0);
        }
        listUnits.set(j, listUnits.get(j)! + this.info.sanctuary_lost[i][j]);
      }
    }
    for (const [i, nb] of listUnits) {
      if (nb > 0) {
        list.push({
          code: i,
          nb: nb,
        });
      }
    }

    return list;
  }
}
