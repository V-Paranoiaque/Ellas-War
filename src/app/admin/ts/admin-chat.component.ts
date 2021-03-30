import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import volumeMute from '@iconify/icons-fa-solid/volume-mute';
import volumeOff from '@iconify/icons-fa-solid/volume-off';

@Component({
  templateUrl: '../html/admin-chat.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminChat {
  
  public adminChatList:any;
  
  volumeMute = volumeMute;
  volumeOff = volumeOff;
  
  constructor(private socket: Socket, public user: User, 
              public translate: TranslateService) {
    this.adminChatList = [];
  }
  
  ngOnInit() {
    this.socket.emit('adminChatList');
    
    this.socket.on('adminChatList', (msg:any) => {
      this.adminChatList = msg;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminChatList');
  }
  
  adminChatCensor = (id:number) => {
    this.socket.emit('adminChatCensure', id);
  }
}
