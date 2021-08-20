import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-pauses.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminPausesComponent implements OnInit, OnDestroy {
  public adminPause:any[];
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.adminPause = [];
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminPause');
    
    this.socket.on('adminPause', (res:any) => {
      this.adminPause = res;
    })
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminPause');
  }
}
