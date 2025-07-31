import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { CommonModule } from '@angular/common';
import { IcIconComponent } from 'src/services/ic-icon.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-army-summary-popup',
  templateUrl: './army-summary-popup.sub-component.html',
  imports: [CommonModule, IcIconComponent, TranslateModule],
})
export class ArmySummaryPopupSubComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  private army: {
    code: string;
    lvlmini: number;
    consumption: object;
    attack: number;
    defense: number;
    type: number;
  }[] = [];
  private buildings: {
    code: string;
    lvlmini: number;
    production: object;
    consumption: object;
    type: number;
    field: number;
    defense: number;
  }[] = [];

  public defenseWallStrength: number;
  public wallDefense: number;

  Tools = Tools;

  shieldShaded = shieldShaded;
  swordIcon = swordIcon;

  constructor() {
    this.defenseWallStrength = 0;
    this.wallDefense = 0;
  }

  ngOnInit() {
    this.army = this.user.getArmy();
    this.buildings = this.user.getBuildings();

    this.socket.emit('defenseWallStrength');
    this.socket.emit('wallDefense');

    this.socket.on('defenseWallStrength', (data: number) => {
      this.defenseWallStrength = data;
    });
    this.socket.on('wallDefense', (data: number) => {
      this.wallDefense = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('defenseWallStrength');
    this.socket.removeListener('wallDefense');
  }

  getAttack() {
    let nb = 0;
    for (const i in this.army) {
      const unit = this.army[i];
      nb += this.user.getPropertyNb(unit.code) * unit.attack;
    }

    return nb;
  }

  getDefense() {
    let nb = 0;
    for (const i in this.army) {
      const unit = this.army[i];
      if (unit.defense) {
        nb += this.user.getPropertyNb(unit.code) * unit.defense;
      }
    }
    for (const i in this.buildings) {
      const building = this.buildings[i];
      if (building.type === 2) {
        nb += this.user.getPropertyNb(building.code) * building.defense;
      }
    }

    nb += this.defenseWallStrength;
    nb += this.wallDefense * this.user.getPropertyNb('poseidon_wall');

    return nb;
  }

  nbKind() {
    let nb = 0;
    for (const unit of this.user.getArmy()) {
      if (
        this.user.getPropertyNb(unit.code) > 0 &&
        (unit.attack > 0 || unit.defense > 0)
      ) {
        nb++;
      }
    }
    for (const building of this.user.getBuildings()) {
      if (this.user.getPropertyNb(building.code) > 0 && building.type === 2) {
        nb++;
      }
    }
    return nb;
  }
}
