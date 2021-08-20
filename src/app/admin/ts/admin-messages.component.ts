import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-messages.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminMessagesComponent implements OnInit, OnDestroy {
  
  public msgError:number;
  public messageTest:boolean;
  public messageText:string;
  public messageTitle:string;
  public messageType:string;
  
  constructor(public user: User, private socket: Socket,
              public translate: TranslateService) {
    this.msgError = 0;
    this.messageTest = true;
    this.messageText = '';
    this.messageTitle = '';
    this.messageType = 'msg';
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.on('adminEmailAll', () => {
      this.msgError = 1;
    });
    this.socket.on('adminWriteAll', () => {
      this.msgError = 1;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminEmailAll');
    this.socket.removeListener('adminWriteAll');
  }
  
  sendMessage() {
    this.msgError = 0;
    let test = 1;
    
    if(!this.messageTest) {
      test = 0;
    }
    
    this.messageTitle = this.messageTitle.trim();
    this.messageText  = this.messageText.trim();
    
    if(this.messageTitle.length == 0 || this.messageText.length == 0) {
      return;
    }
    
    let msg = {
      'title': this.messageTitle,
      'text': this.messageText,
      'test': test
    }
    
    if(this.messageType == 'msg') {
      this.socket.emit('adminWriteAll', msg);
    }
    else {
      this.socket.emit('adminEmailAll', msg);
    }
  }
}
