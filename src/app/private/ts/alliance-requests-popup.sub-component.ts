import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import check from '@iconify/icons-fa-solid/check';
import times from '@iconify/icons-fa-solid/times';

@Component({
  selector: 'alliance-requests-popup',
  templateUrl: '../html/alliance-requests-popup.sub-component.html'
})

export class AllianceRequestsPopup {
  
  @Input() info:any;
  @Input() profile:any;
  
  public myAllianceAskAcceptError:number;
  public myAllianceAskList:any;
  public myAllianceAskMy:any;
  
  check = check;
  times = times;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.myAllianceAskAcceptError = 0;
    this.myAllianceAskList = {}
    this.myAllianceAskMy = {};
  }
  
  ngOnInit() {
    this.socket.on('myAllianceAskAccept', (data:number) => {
      this.myAllianceAskAcceptError = data;
    });
    this.socket.on('myAllianceAskList', (data:any) => {
      let res_id = this.user.getResId(this.info.resource);
      this.myAllianceAskList = [];
      for(let row in data) {
        if(data[row].resource_id == res_id) {
          this.myAllianceAskList.push(data[row]);
        }
      }
    });
    this.socket.on('myAllianceAskMy', (data:any) => {
      this.myAllianceAskMy = data;
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
      'type': this.user.getResId(this.info.resource),
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
