import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';

import { environment } from './../../environments/environment';

import minotaurIcon from '@iconify/icons-game-icons/minotaur';
import bowAndArrow from '@iconify-icons/emojione-monotone/bow-and-arrow';
import footPrint from '@iconify-icons/mdi/foot-print';
import horseIcon from '@iconify-icons/mdi/horse';
import manSharp from '@iconify-icons/ion/man-sharp';
import questionCircle from '@iconify/icons-fa6-regular/circle-question';
import roundStar from '@iconify/icons-ic/round-star';
import roundStarBorder from '@iconify/icons-ic/round-star-border';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import { default as sword } from '@iconify-icons/whh/sword';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-army-popup',
  templateUrl: './army-popup.sub-component.html',
})
export class ArmyPopupSubComponent implements OnInit, OnDestroy {
  @Input() info!: {
    code: string;
    attack: number;
    defense: number;
    type: number;
    lvlmini: number;
    rEngageNb: number;
    rLiberateNb: number;
    engageNb: string;
    rEngagePossible: number;
    liberatenb: string;
    free: number;
    placen: number;
    placep: number;
    placec: number;
    resaler: object;
    resale: number;
    nbmax: number;
    temple: {
      artemis: number;
      hephaestus: number;
      dionysus: number;
      ares: number;
      zeus: number;
      hades: number;
    };
    cost: object;
    consumption: object;
    camp_level: number;
    power: string;
    power_level: number;
    error: number;
    building: {
      militarycamp: number;
    };
    condition: {
      ranking: number;
    };
  };
  public unitFavoriteList: object = new Object();

  Tools = Tools;
  Number = Number;
  Object = Object;
  parseInt = parseInt;

  minotaurIcon = minotaurIcon;
  footPrint = footPrint;
  bowAndArrow = bowAndArrow;
  horseIcon = horseIcon;
  manSharp = manSharp;
  questionCircle = questionCircle;
  shieldShaded = shieldShaded;
  roundStar = roundStar;
  roundStarBorder = roundStarBorder;
  sword = sword;
  swordIcon = swordIcon;

  constructor(
    private socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.socket.on('engagePossible', (nb: number) => {
      this.info.rEngagePossible = nb;
    });
    this.socket.on('freeUnits', (nb: number) => {
      this.info.free = nb;
    });
    this.socket.on('build', () => {
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.on('destruct', () => {
      this.socket.emit('engagePossible', this.info.code);
      this.socket.emit('freeUnits', this.info.code);
    });
    this.socket.on('engage', (nb: number) => {
      this.info.rEngageNb = nb;
      this.info.rLiberateNb = 0;
      this.socket.emit('engagePossible', this.info.code);
    });
    this.socket.on('liberate', (nb: number) => {
      this.info.rEngageNb = 0;
      this.info.rLiberateNb = nb;
      this.socket.emit('engagePossible', this.info.code);
      this.socket.emit('freeUnits', this.info.code);
    });
    this.socket.on('unitFavoriteList', data => {
      this.unitFavoriteList = data as object;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('engagePossible');
    this.socket.removeListener('freeUnits');
    this.socket.removeListener('build');
    this.socket.removeListener('destruct');
    this.socket.removeListener('engage');
    this.socket.removeListener('liberate');
    this.socket.removeListener('unitFavoriteList');
  }

  armyEngage() {
    const unit = this.info.code;
    const nb = this.info.engageNb;
    this.info.rEngageNb = 0;
    this.info.rLiberateNb = 0;
    this.info.error = 0;

    if (nb === '' || nb === null) {
      this.info.error = 1;
    }

    if (parseInt(nb) > 0) {
      const msg = {
        unit: unit,
        nb: parseInt(nb),
      };

      this.info.engageNb = '';
      this.socket.emit('engage', msg);
    }
  }

  armyLiberate() {
    const unit = this.info.code;
    const nb = this.info.liberatenb;
    this.info.rEngageNb = 0;
    this.info.rLiberateNb = 0;
    this.info.error = 0;

    if (nb === '' || nb === null) {
      this.info.error = 1;
    }

    if (parseInt(nb) > 0) {
      const msg = {
        unit: unit,
        nb: parseInt(nb),
      };
      this.socket.emit('liberate', msg);
    }
  }

  hasHosting() {
    if (
      (this.info.placen &&
        (this.user.getPropertyNb('placen') -
          this.user.getPropertyNb('placenactu') -
          parseInt(this.info.engageNb) * this.info.placen <
          0 ||
          this.user.getPropertyNb('placen') ===
            this.user.getPropertyNb('placenactu'))) ||
      (this.info.placep &&
        (this.user.getPropertyNb('placep') -
          this.user.getPropertyNb('placepactu') -
          parseInt(this.info.engageNb) * this.info.placep <
          0 ||
          this.user.getPropertyNb('placep') ===
            this.user.getPropertyNb('placepactu'))) ||
      (this.info.placec &&
        (this.user.getPropertyNb('placec') -
          this.user.getPropertyNb('placecactu') -
          parseInt(this.info.engageNb) * this.info.placec <
          0 ||
          this.user.getPropertyNb('placec') ===
            this.user.getPropertyNb('placecactu')))
    ) {
      return false;
    } else {
      return true;
    }
  }

  missingResource() {
    const list = [];
    if (this.info.cost) {
      for (const id in environment.resources) {
        const res = environment.resources[id];
        const cost = this.info.cost;

        if (
          cost[res as keyof typeof cost] &&
          (cost[res as keyof typeof cost] > this.user.getPropertyNb(res) ||
            cost[res as keyof typeof cost] * parseInt(this.info.engageNb) >
              this.user.getPropertyNb(res))
        ) {
          list.push(res);
        }
      }
    }
    return list;
  }

  missingConsumption() {
    const list = [];
    if (this.info.consumption) {
      for (const id in environment.resources) {
        const res = environment.resources[id];
        const consumption = this.info.consumption;

        if (
          consumption[res as keyof typeof consumption] &&
          this.user.getPropertyNb(res) <= 0
        ) {
          list.push(res);
        }
      }
    }
    return list;
  }

  setEngage(nb: number) {
    this.info.engageNb = nb.toString();
  }

  setLiberate() {
    this.info.rEngageNb = 0;
    this.info.rLiberateNb = 0;
    this.info.liberatenb = this.user.getPropertyNb(this.info.code).toString();
  }

  favoriteAdd() {
    this.socket.emit('unitFavoriteAdd', this.info.code);
  }

  favoriteDelete() {
    this.socket.emit('unitFavoriteDelete', this.info.code);
  }

  realEngageNb() {
    if (parseInt(this.info.engageNb) >= 1) {
      return Math.ceil(parseInt(this.info.engageNb));
    }
    return 1;
  }
  realLiberateNb() {
    if (parseInt(this.info.liberatenb) >= 1) {
      return Math.ceil(parseInt(this.info.liberatenb));
    }
    return 1;
  }
  hasConsumption() {
    for (const [, res] of Object.entries(this.info.consumption)) {
      if (res > 0) {
        return true;
      }
    }
    return false;
  }
}
