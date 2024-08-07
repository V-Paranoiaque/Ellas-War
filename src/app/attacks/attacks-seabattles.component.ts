import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';

import trireme from '@iconify/icons-game-icons/trireme';
import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  templateUrl: './attacks-seabattles.component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
})
export class AttacksSeabattlesComponent implements OnInit, OnDestroy {
  public sbData = {
    sb_id: 0,
    sb_status: 0,
    sb_nb: 0,
    start_date: 0,
    coins: 0,
    sb_map: {},
  };
  public currentCase = {
    case_type: -1,
    can_engage: 0,
    color_id: 0,
    username: '',
    x: 0,
    y: 0,
    bireme: 0,
    trireme: 0,
    quadrireme: 0,
    leviathan: 0,
  };
  public currentUnit = {
    name: '',
    code: '',
    attack: 0,
    defense: 0,
    cost: 0,
  };

  shieldShaded = shieldShaded;
  swordIcon = swordIcon;
  trireme = trireme;

  Object = Object;
  Tools = Tools;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.socket.emit('sbGet');

    this.socket.on('sbGet', (data: object) => {
      this.sbData = data as typeof this.sbData;
    });
    this.socket.on('sbGetCase', (data: object) => {
      this.currentCase = data as typeof this.currentCase;
      const name = this.currentCase.x.toString() + '_' + this.currentCase.y.toString();
      (this.sbData.sb_map[name as keyof typeof this.sbData.sb_map] as object) = this.currentCase;
    });
    this.socket.on('sbJoin', (data: object) => {
      this.sbData = data as typeof this.sbData;
    });
    this.socket.on('sbRefresh', () => {
      this.socket.emit('sbGet');
      this.socket.emit('sbGetCase', {
        map_id: this.sbData.sb_id,
        x: this.currentCase.x,
        y: this.currentCase.y,
      });
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('sbJoin');
    this.socket.removeListener('sbGet');
    this.socket.removeListener('sbGetCase');
    this.socket.removeListener('sbRefresh');
  }

  sbJoin() {
    this.socket.emit('sbJoin');
  }

  getCase(x: number, y: number) {
    /** Types:
     * 0: border
     * 1: unknown
     * 2: empty
     * 3: army
     * 4: capital
     */
    const name = x.toString() + '_' + y.toString();
    if (this.isBorder(x, y)) {
      return {
        case_type: 0,
        can_engage: 0,
        x: x,
        y: y,
        bireme: 0,
        trireme: 0,
        quadrireme: 0,
        leviathan: 0,
      };
    } else if (Object.hasOwn(this.sbData.sb_map, name)) {
      return this.sbData.sb_map[name as keyof typeof this.sbData.sb_map];
    } else {
      return {
        case_type: 1,
        can_engage: 0,
        color_id: 0,
        username: '',
        x: x,
        y: y,
        bireme: 0,
        trireme: 0,
        quadrireme: 0,
        leviathan: 0,
      };
    }
  }
  isBorder(x: number, y: number) {
    if (
      (x <= 5 && y <= 5) ||
      (x <= 5 && y >= 11) ||
      (x >= 11 && y <= 5) ||
      (x >= 11 && y >= 11)
    ) {
      return true;
    }
    return false;
  }

  selectCase(x: number, y: number) {
    this.currentCase = this.getCase(x, y) as typeof this.currentCase;
    this.socket.emit('sbGetCase', {
      map_id: this.sbData.sb_id,
      x: this.currentCase.x,
      y: this.currentCase.y,
    });
  }

  getUnits() {
    const list:{
      attack: number,
      defense: number,
      cost: number,
      code: string
    }[] = [];
    for(const [code, unit] of Object.entries(this.user.getDatas().sea_battles.units)) {
      list.push({...unit, ...{
        code: code,
        name: Tools.getName(code),
      }});
    }
    return list;
  }

  getUnitsCurrent(name: string) {
    return this.currentCase[name as keyof object];
  }

  selectUnit(info: object) {
    this.currentUnit = info as typeof this.currentUnit;
  }
}
