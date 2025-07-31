import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { AttacksSeabattlesAbstractComponent } from './attacks-seabattles-abstract.component';

import shieldShaded from '@iconify/icons-bi/shield-shaded';
import swordIcon from '@iconify/icons-vaadin/sword';

@Component({
  selector: 'app-attacks-seabattles-engage-popup',
  templateUrl: './attacks-seabattles-engage-popup.sub-component.html',
  styleUrls: ['./attacks.component.css', './attacks-seabattles.component.css'],
  imports: [CommonModule, FormsModule, IcIconComponent, TranslateModule],
})
export class AttacksSeabattlesEngagePopupSubComponent
  extends AttacksSeabattlesAbstractComponent
  implements OnInit, OnDestroy
{
  protected override http: HttpClient;
  protected override socket: Socket;
  override user: User;
  override translate: TranslateService;
  protected override modalService: BsModalService;

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
  shieldShaded = shieldShaded;
  swordIcon = swordIcon;

  constructor() {
    const http = inject(HttpClient);
    const socket = inject(Socket);
    const user = inject(User);
    const translate = inject(TranslateService);
    const modalService = inject(BsModalService);

    super();

    this.http = http;
    this.socket = socket;
    this.user = user;
    this.translate = translate;
    this.modalService = modalService;
  }

  ngOnInit() {
    this.socket.on('sbEngage', (data: number) => {
      this.unit.error = data;
    });
    this.socket.on('sbGet', (data: object) => {
      this.sbData = data as typeof this.sbData;
    });
  }

  ngOnDestroy() {
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
