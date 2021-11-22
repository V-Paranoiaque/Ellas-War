import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-404.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class Admin404Component implements OnInit, OnDestroy {
  
  public pageList:any;
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.pageList = [];
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminList404');
    
    this.socket.on('adminList404', (list:any) => {
      this.pageList = list;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminList404');
  }
}
