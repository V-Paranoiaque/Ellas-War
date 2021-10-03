import { Component, OnInit } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-actions.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminActionsComponent implements OnInit {
  
  public adminActions:any;
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.adminActions ='';
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
  }
  
  run() {
    if(this.adminActions.length > 0) {
      this.socket.emit('adminActions', this.adminActions);
      this.adminActions = '';
    }
  }
}
