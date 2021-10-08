import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-home.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminHomeComponent implements OnInit, OnDestroy {
  
  public adminStats:any;
  
  constructor(private socket: Socket, public user: User, 
              public translate: TranslateService) {
    this.adminStats = {};
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminStats');
    
    this.socket.on('adminStats', (msg:any) => {
      this.adminStats = msg;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminStats');
  }
}
