import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temple-info-popup',
  templateUrl: './temple-info-popup.sub-component.html',
  imports: [CommonModule, EwIconSubComponent, FormsModule, TranslateModule],
})
export class TempleInfoPopupSubComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  @Input() temple!: {
    id: number;
    error: number;
    power: number;
  };

  public wallDefense: number;
  public idToUser: string;
  public id: number;
  public preUseList: {
    membre_id: number;
    username: string;
  }[];
  public furyNb: string;
  public furyCost: { drachma: number; food: number; wood: number };
  public lightningCost: { food: number; wine: number; gold: number };
  public lightningNb: string;
  public attackStats = {
    normal: {
      available: 0,
    },
    bonus: {
      available: 0,
    },
  };

  private sub: Subscription;

  Number = Number;
  Tools = Tools;

  constructor() {
    const user = this.user;

    this.wallDefense = 0;
    this.idToUser = '';
    this.id = 0;
    this.preUseList = [];
    this.furyNb = '';
    this.lightningNb = '';

    this.furyCost = {
      drachma: 300000 + user.getPropertyNb('level') * 20000,
      food: 1000000 + user.getPropertyNb('level') * 20000,
      wood: 400000 + user.getPropertyNb('level') * 10000,
    };
    this.lightningCost = {
      food: 4000000,
      wine: 80000,
      gold: 60000,
    };
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.socket.emit('wallDefense');
    this.socket.emit('myAttacksList');

    this.socket.on('wallDefense', (def: number) => {
      this.wallDefense = def;
    });
    this.socket.on('myAttacksList', result => {
      this.preUseList = result;
    });

    this.socket.on('powersUse', (result: { error: number }) => {
      this.temple.error = result.error;
      this.socket.emit('myAttacksList');
    });
    this.socket.on('attackStats', data => {
      this.attackStats = data;
    });

    this.socket.on('attackStatsRefresh', () => {
      this.socket.emit('attackStats');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('attackStats');
    this.socket.removeListener('attackStatsRefresh');
    this.socket.removeListener('wallDefense');
    this.socket.removeListener('myAttacksList');
    this.socket.removeListener('powersUse');
    this.sub.unsubscribe();
  }

  furyBuy(nb: string) {
    this.socket.emit('furyBuy', parseInt(nb));
    this.furyNb = '';
  }

  furyCostMissing() {
    const list = [];

    for (const res in this.furyCost) {
      if (
        this.furyCost[res as keyof typeof this.furyCost] *
          parseInt(this.furyNb) >
        this.user.getPropertyNb(res)
      ) {
        list.push(res);
      }
    }

    return list;
  }

  lightningBuy(nb: string) {
    this.socket.emit('lightningBuy', parseInt(nb));
    this.lightningNb = '';
  }

  lightningCostMissing() {
    const list = [];

    for (const res in this.lightningCost) {
      if (
        this.lightningCost[res as keyof typeof this.lightningCost] *
          parseInt(this.furyNb) >
        this.user.getPropertyNb(res)
      ) {
        list.push(res);
      }
    }

    return list;
  }

  powerUse(powerid: number, param: number) {
    const info = {
      id: powerid,
      param: param,
    };
    this.temple.power = powerid;
    this.socket.emit('powersUse', info);
  }

  powerUseTarget(powerid: number) {
    this.temple.error = 0;
    let info;
    this.temple.power = powerid;
    if (this.idToUser.length > 0) {
      const url =
        this.socket.url + '/api/playerProfile/' + this.idToUser + '.json';

      this.sub = this.http.get(url).subscribe(result => {
        const res = result as { membre_id: number };
        if (res.membre_id) {
          info = {
            id: this.temple.power,
            param: res.membre_id,
          };
          this.socket.emit('powersUse', info);
        } else {
          this.idToUser = '';
          this.temple.error = 2;
        }
      });
    } else {
      this.idToUser = '';
      this.temple.error = 2;
    }
  }

  wallErect() {
    this.socket.emit('wallErect');
  }
}
