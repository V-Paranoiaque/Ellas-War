import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import check from '@iconify/icons-fa6-solid/check';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AllianceAbstractComponent } from './alliance-abstract.component';
import { EwIconSubComponent } from 'src/services/ew-icon.service';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { UserProfileSubComponent } from '../main/main-user-profile.sub-component';

import times from '@iconify/icons-fa6-solid/xmark';

@Component({
  selector: 'app-alliance-requests-popup',
  templateUrl: './alliance-requests-popup.sub-component.html',
  imports: [
    CommonModule,
    EwIconSubComponent,
    FormsModule,
    IcIconComponent,
    TranslateModule,
    UserProfileSubComponent,
  ],
})
export class AllianceRequestsPopupSubComponent
  extends AllianceAbstractComponent
  implements OnInit, OnDestroy
{
  @Input() info!: { resource: string; quantity: string; stock: number };
  @Input() profile!: {
    alliance_name: string;
    chief_id: number;
    description: string;
  };

  public myAllianceAskAcceptError: number;
  public myAllianceAskList: {
    quantity: number;
    resource_id: number;
    alliance_ask_id: number;
    membre_id: number;
    username: string;
  }[];
  public myAllianceAskMy: {
    quantity: number;
    resource_id: number;
    alliance_ask_id: number;
  }[];

  check = check;
  times = times;

  constructor(
    protected override socket: Socket,
    public override user: User,
    public override translate: TranslateService
  ) {
    super(socket, user, translate);

    this.myAllianceAskAcceptError = 0;
    this.myAllianceAskList = [];
    this.myAllianceAskMy = [];
  }

  ngOnInit() {
    this.socket.on('myAllianceAskAccept', (data: number) => {
      this.myAllianceAskAcceptError = data;
    });
    this.socket.on(
      'myAllianceAskList',
      (
        data: {
          quantity: number;
          resource_id: number;
          alliance_ask_id: number;
          membre_id: number;
          username: string;
        }[]
      ) => {
        const res_id = Tools.getResId(this.info.resource);
        this.myAllianceAskList = [];
        for (const row in data) {
          if (data[row].resource_id === res_id) {
            this.myAllianceAskList.push(data[row]);
          }
        }
      }
    );
    this.socket.on('myAllianceAskMy', (data: object[]) => {
      this.myAllianceAskMy = data as typeof this.myAllianceAskMy;
    });
    this.socket.on('myAllianceAskRefresh', () => {
      this.socket.emit('myAllianceAskList');
      this.socket.emit('myAllianceAskAccept');
      this.socket.emit('myAllianceAskMy');
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('myAllianceAskAccept');
    this.socket.removeListener('myAllianceAskList');
    this.socket.removeListener('myAllianceAskMy');
    this.socket.removeListener('myAllianceAskRefresh');
  }

  askRess() {
    const res = {
      type: Tools.getResId(this.info.resource),
      qtt: this.info.quantity,
    };
    if (parseInt(res.qtt) > 0) {
      this.socket.emit('myAllianceAsk', res);
    }
    this.info.quantity = '';
  }

  myAllianceAskAccept = (id: number) => {
    this.socket.emit('myAllianceAskAccept', id);
  };
  myAllianceAskCancel = (id: number) => {
    this.socket.emit('myAllianceAskCancel', id);
  };
  myAllianceAskRefuse = (id: number) => {
    this.socket.emit('myAllianceAskRefuse', id);
  };
}
