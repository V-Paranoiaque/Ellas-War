import { RouterModule } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { environment } from './../../environments/environment';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';

import chartLine from '@iconify/icons-fa6-solid/chart-line';
import landFields from '@iconify/icons-mdi/land-fields';
import shieldShaded from '@iconify/icons-bi/shield-shaded';

@Component({
  selector: 'app-construction-popup',
  templateUrl: './construction-popup.sub-component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class ConstructionPopupSubComponent implements OnInit, OnDestroy {
  @Input() info!: {
    code: string;
    type: number;
    defense: number;
    field: number;
    cost: Map<string, number>;
    destruct: Map<string, number>;
    production: Map<string, number>;
    consumption: Map<string, number>;
    placen: number;
    placep: number;
    placec: number;
    nbmax: number;
    nbmin: number;
    buildNb: string;
    destructNb: string;
    rBuildNb: string;
    rDestructNb: string;
    rBuildPossible: number;
    errorBuilding: number;
  };
  range: number;

  Math = Math;
  Number = Number;
  Tools = Tools;

  chartLine = chartLine;
  landFields = landFields;
  shieldShaded = shieldShaded;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {
    this.range = user.getPropertyNb('quarry_pct');
  }

  ngOnInit() {
    this.socket.on('buildPossible', (nb: number) => {
      this.info.rBuildPossible = nb;
    });
    this.socket.on('build', (nb: number) => {
      this.info.rBuildNb = nb.toString();
      this.info.rDestructNb = '';

      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.on('destruct', (nb: number) => {
      this.info.rBuildNb = '';
      this.info.rDestructNb = nb.toString();

      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.on('engage', () => {
      this.socket.emit('buildPossible', this.info.code);
    });
    this.socket.on('liberate', () => {
      this.socket.emit('buildPossible', this.info.code);
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('buildPossible');
    this.socket.removeListener('build');
    this.socket.removeListener('destruct');
    this.socket.removeListener('engage');
    this.socket.removeListener('liberate');
  }

  buildingBuild() {
    const building = this.info.code;
    const nb = parseInt(this.info.buildNb);

    this.info.rBuildNb = '';
    this.info.rDestructNb = '';

    if (!nb) {
      this.info.errorBuilding = 1;
    } else {
      this.info.errorBuilding = 0;
    }

    if (nb > 0) {
      const msg = {
        building: building,
        nb: nb,
      };

      this.socket.emit('build', msg);
    }
  }

  buildingDestruct() {
    const building = this.info.code;
    const nb = parseInt(this.info.destructNb);

    this.info.rBuildNb = '';
    this.info.rDestructNb = '';

    if (!nb) {
      this.info.errorBuilding = 1;
    } else {
      this.info.errorBuilding = 0;
    }

    if (nb > 0) {
      const msg = {
        building: building,
        nb: nb,
      };
      this.socket.emit('destruct', msg);
    }
  }

  getConsumption() {
    const list = [];
    for (const i in this.info.consumption) {
      list.push({
        code: i,
        nb: this.info.consumption[i as keyof object],
      });
    }
    return list;
  }

  getProduction() {
    const list = [];
    for (const i in this.info.production) {
      list.push({
        code: i,
        nb: this.info.production[i as keyof object],
      });
    }
    return list;
  }

  missingResource() {
    const list = [];
    if (this.info.cost) {
      for (const id in environment.resources) {
        const res = environment.resources[id];
        if (
          this.info.cost[res as keyof object] &&
          (this.info.cost[res as keyof object] > this.user.getPropertyNb(res) ||
            this.info.cost[res as keyof object] * parseInt(this.info.buildNb) >
              this.user.getPropertyNb(res))
        ) {
          list.push(res);
        }
      }
    }
    return list;
  }

  setBuild(nb: number) {
    this.info.buildNb = nb.toString();
  }

  setDestruct() {
    this.info.destructNb = this.user.getPropertyNb(this.info.code).toString();
  }

  updateCamp() {
    this.socket.emit('updateCamp');
  }

  realBuildNb() {
    if (parseInt(this.info.buildNb) >= 1) {
      return Math.ceil(parseInt(this.info.buildNb));
    }
    return 1;
  }
  realDestructNb() {
    if (parseInt(this.info.destructNb) >= 1) {
      return Math.ceil(parseInt(this.info.destructNb));
    }
    return 1;
  }
  setQuarryBalance(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.socket.emit('quarryBalance', value);
  }
}
