import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import check from '@iconify/icons-fa-solid/check';
import times from '@iconify/icons-fa-solid/times';

@Component({
  selector: 'app-alliance-requests-popup',
  templateUrl: '../html/alliance-requests-popup.sub-component.html'
})

export class AllianceRequestsPopupSubComponent implements OnInit, OnDestroy {
  
  @Input() info:any;
  @Input() profile:any;
  
  public myAllianceAskAcceptError:number;
  public myAllianceAskList:{quantity:number, resource_id:number, alliance_ask_id:number,membre_id:number,username:string}[];
  public myAllianceAskMy:{quantity:number, resource_id:number, alliance_ask_id:number}[];
  
  check = check;
  times = times;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.myAllianceAskAcceptError = 0;
    this.myAllianceAskList = [];
    this.myAllianceAskMy = [];
  }
  
  ngOnInit() {
    this.socket.on('myAllianceAskAccept', (data:number) => {
      this.myAllianceAskAcceptError = data;
    });
    this.socket.on('myAllianceAskList', (data) => {
      let res_id = Tools.getResId(this.info.resource);
      this.myAllianceAskList = [];
      for(let row in data) {
        if(data[row].resource_id == res_id) {
          this.myAllianceAskList.push(data[row]);
        }
      }
    });
    this.socket.on('myAllianceAskMy', (data) => {
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
    let res = {
      'type': Tools.getResId(this.info.resource),
      'qtt': this.info.quantity
    };
    if(res.qtt > 0) {
      this.socket.emit('myAllianceAsk', res);
    }
    this.info.quantity = '';
  }
  
  myAllianceAskAccept = (id:number) => {
    this.socket.emit('myAllianceAskAccept', id);
  }
  myAllianceAskCancel = (id:number) => {
    this.socket.emit('myAllianceAskCancel', id);
  }
  myAllianceAskRefuse = (id:number) => {
    this.socket.emit('myAllianceAskRefuse', id);
  }
  
}
