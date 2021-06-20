import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import brushIcon from '@iconify/icons-bi/brush';

@Component({
  templateUrl: '../html/admin-permissions.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminPermissions {
  
  public adminPermissionsList:any;
  public selectedPlayer:any;
  public usernameNew:string;
  
  //Icons
  brushIcon    = brushIcon;
  
  constructor(public user: User, private socket: Socket,
              public translate: TranslateService) {
    this.adminPermissionsList = [];
    this.selectedPlayer = {}
    this.usernameNew = '';
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminPermissionsList');
    
    this.socket.on('adminPermissionsList', (msg:any) => {
      this.adminPermissionsList = msg;
    });
    
    this.socket.on('adminPermissionsNew', () => {
      this.socket.emit('adminPermissionsList');
    });
    
    this.socket.on('adminPermissionsModify', () => {
      this.socket.emit('adminPermissionsList');
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminPermissionsList');
    this.socket.removeListener('adminPermissionsNew');
    this.socket.removeListener('adminPermissionsModify');
  }
  
  permissionsNew() {
    this.usernameNew = this.usernameNew.trim();
    
    if(this.usernameNew.length > 0) {
      this.socket.emit('adminPermissionsNew', this.usernameNew);
      this.usernameNew = '';
    }
  }
  
  permissionsModify() {
    let msg = {
      'id': this.selectedPlayer.membre_id,
      'permission': this.selectedPlayer.rank
    };
    this.socket.emit('adminPermissionsModify', msg);
  }
  
  selectPlayer(p:any) {
    this.selectedPlayer = p;
  }
}
