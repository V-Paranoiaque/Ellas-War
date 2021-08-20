import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/admin-resources.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminResourcesComponent implements OnInit, OnDestroy {
  public ressList:any;
  public give:any;
  public error:number
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.ressList = environment.resources;
    this.error = 0;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.give = {
      'player': '',
      'resource': 0,
      'quantity': '',
      'reason': 3
    }
    this.socket.on('adminResGive', (error:number) => {
      this.error = error;
    })
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminResGive');
  }
  
  sendRes() {
    this.error = 0;
    this.socket.emit('adminResGive', {
      'target': this.give.player,
      'nb': this.give.quantity,
      'res': this.give.resource,
      'type': this.give.reason
    })
  }
}
