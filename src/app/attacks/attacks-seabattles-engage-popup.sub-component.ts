import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

import { AttacksSeabattlesComponent } from './attacks-seabattles.component';

@Component({
  selector: 'app-attacks-seabattles-engage-popup',
  templateUrl: './attacks-seabattles-engage-popup.sub-component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
})
export class AttacksSeabattlesEngagePopupSubComponent
  extends AttacksSeabattlesComponent
  implements OnInit, OnDestroy
{
  @Input() case!: {
    case_type: number;
    can_engage: number;
    color_id: number;
    username: string;
    x: number;
    y: number;
    bireme: number;
    trireme: number;
    quadrireme: number;
    leviathan: number;
    oxybeles: number;
  };
  @Input() unit!: {
    name: string;
    code: string;
    attack: number;
    defense: number;
    cost: number;
    engage: string;
    error: number;
  };
  @Input() coins!: number;
  @Input() mouvements!: number;

  Math = Math;

  constructor(
    protected override http: HttpClient,
    protected override socket: Socket,
    public override user: User,
    public override translate: TranslateService,
    protected override modalService: BsModalService
  ) {
    super(http, socket, user, translate, modalService);
  }

  override ngOnInit() {
    this.socket.on('sbEngage', (data: number) => {
      this.unit.error = data;
    });
    this.socket.on('sbGet', (data: object) => {
      this.sbData = data as typeof this.sbData;
    });
  }

  override ngOnDestroy() {
    this.socket.removeListener('sbEngage');
    this.socket.removeListener('sbGet');
  }

  engage() {
    this.unit.error = -1;
    this.socket.emit('sbEngage', {
      sb_id: this.sbData.sb_id,
      x: this.case.x,
      y: this.case.y,
      unit_name: this.unit.code,
      nb: this.unit.engage,
    });
  }

  getCurrent() {
    return this.case[this.unit.code as keyof object];
  }

  getEngage() {
    const engage = Math.round(parseInt(this.unit.engage));
    return engage > 0 ? engage : 1;
  }

  setEngage(nb: number) {
    this.unit.engage = nb.toString();
  }
}
