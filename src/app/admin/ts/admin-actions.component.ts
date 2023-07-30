import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import { environment } from '../../../environments/environment';

@Component({
  templateUrl: '../html/admin-actions.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminActionsComponent implements OnInit, OnDestroy {
  
  public adminActions:string;
  public adminStoreroom:any;
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.adminActions ='';
    this.adminStoreroom = {};
    for(let res of environment.resources) {
      this.adminStoreroom[res] = {
        'quantity': 0,
        'price': 0
      };
    }
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminStoreroomAutoList');
    
    this.socket.on('adminStoreroomAutoList', (list:object) => {
      for(let res in list) {
        this.adminStoreroom[res as keyof typeof this.adminStoreroom] = list[res as keyof typeof list];
      }
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminStoreroomAutoList');
  }
  
  run() {
    if(this.adminActions.length > 0) {
      this.socket.emit('adminActions', this.adminActions);
      this.adminActions = '';
    }
  }
  
  storeroomSave() {
    this.socket.emit('adminStoreroomAutoSave', this.adminStoreroom);
  }
}
