import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { ToolsComponent as Tools } from 'src/services/tools.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { IcIconComponent } from 'src/services/ic-icon.service';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-attacks-seabattles-move-popup',
  templateUrl: './attacks-seabattles-move-popup.sub-component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
  imports: [CommonModule, IcIconComponent, TranslateModule],
})
export class AttacksSeabattlesMovePopupSubComponent
  implements OnInit, OnDestroy
{
  @Input() sb_id!: number;
  @Input() src_case?: { x: number; y: number };
  @Input() dest_case?: { x: number; y: number };
  @Input() player_id?: number;

  public currentCase = {
    case_type: -1,
    can_engage: 0,
    color_id: 0,
    player_id: 0,
    username: '',
    x: 0,
    y: 0,
    bireme: 0,
    trireme: 0,
    quadrireme: 0,
    leviathan: 0,
    oxybeles: 0,
  };
  public unitSum = 0;
  public moveArray = new Map<string, number>();
  public lost = {
    init: 0,
    src: {},
    dest: {},
  };

  shieldShaded = shieldShaded;
  swordIcon = swordIcon;

  Tools = Tools;

  constructor(
    protected socket: Socket,
    public user: User,
    public translate: TranslateService,
    protected modalService: BsModalService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.socket.on('sbGetCase', (data: object) => {
      this.unitSum = 0;
      this.currentCase = data as typeof this.currentCase;

      for (const [code] of Object.entries(
        this.user.getDatas().sea_battles.units
      )) {
        this.unitSum += this.currentCase[code as keyof object];
        this.moveArray.set(code, this.currentCase[code as keyof object]);

        setTimeout(() => {
          const obj = document.getElementById('move-' + code);
          if (obj) {
            (obj as HTMLInputElement).value =
              this.currentCase[code as keyof object];
          }
        });
      }
      this.lost = {
        init: 0,
        src: {},
        dest: {},
      };
    });
    this.socket.on(
      'sbAttack',
      (data: { lost: { src: object; dest: object } }) => {
        this.lost.src = data.lost.src as typeof this.lost.src;
        this.lost.dest = data.lost.dest as typeof this.lost.dest;
        this.lost.init = 1;
      }
    );
  }

  ngOnDestroy() {
    this.socket.removeListener('sbAttack');
    this.socket.removeListener('sbGetCase');
  }
  getUnitsCurrent(name: string) {
    return this.currentCase[name as keyof object];
  }

  setMoveUnits(event: Event, code: string) {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.moveArray.set(code, value);
  }

  send(close: number) {
    if (close === 1) {
      this.bsModalRef.hide();
    }

    if (this.src_case && this.dest_case) {
      this.socket.emit('sbMoveOrAttack', {
        sb_id: this.sb_id,
        src: { x: this.src_case.x, y: this.src_case.y },
        dest: { x: this.dest_case.x, y: this.dest_case.y },
        units: Object.fromEntries(this.moveArray.entries()),
      });
    }
  }

  sbMovePossible(
    src: { x: number; y: number },
    dest: { x: number; y: number }
  ) {
    if (Math.abs(src.x - dest.x) > 1 || Math.abs(src.y - dest.y) > 1) {
      return false;
    }
    return true;
  }

  getLostAttacker(unit: string) {
    return this.lost.src[unit as keyof object];
  }
  getLostDefender(unit: string) {
    return this.lost.dest[unit as keyof object];
  }
}
