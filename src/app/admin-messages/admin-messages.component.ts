import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    FormsModule,
    MainPrivateBottomMenuSubComponent,
    TranslateModule,
  ],
})
export class AdminMessagesComponent implements OnInit, OnDestroy {
  public msgError: number;
  public messageTest: boolean;
  public messageText: string;
  public messageTitle: string;
  public messageType: string;

  constructor(
    public user: User,
    private readonly socket: Socket,
    public translate: TranslateService
  ) {
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

    if (!this.messageTest) {
      test = 0;
    }

    this.messageTitle = this.messageTitle.trim();
    this.messageText = this.messageText.trim();

    if (this.messageTitle.length === 0 || this.messageText.length === 0) {
      return;
    }

    const msg = {
      title: this.messageTitle,
      text: this.messageText,
      test: test,
    };

    if (this.messageType == 'msg') {
      this.socket.emit('adminWriteAll', msg);
    } else {
      this.socket.emit('adminEmailAll', msg);
    }
  }
}
