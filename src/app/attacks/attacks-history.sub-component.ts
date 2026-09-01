import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal
} from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Message } from '../../services/message.class';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateDirective } from '@ngx-translate/core';

import { AttacksMessageSubComponent } from './attacks-message.sub-component';
import { FuryMessageSubComponent } from './fury-message.sub-component';
import { IcIconComponent } from '../../services/ic-icon.service';
import { LostMessageSubComponent } from './lost-message.sub-component';
import { MessagesIncludeComponent } from '../messages/messages-include.component';

import arrowReturnLeft from '@iconify/icons-bi/arrow-return-left';
import clipboardCheck from '@iconify/icons-fa6-solid/clipboard-check';
import share from '@iconify/icons-bi/share';

@Component({
  selector: 'app-attacks-history',
  templateUrl: './attacks-history.sub-component.html',
  styleUrls: ['./attacks.component.css'],
  imports: [
    AttacksMessageSubComponent,
    ClipboardModule,
    CommonModule,
    FuryMessageSubComponent,
    IcIconComponent,
    LostMessageSubComponent,
    MessagesIncludeComponent,
    TranslateDirective,
  ],
})
export class AttacksHistorySubComponent implements OnInit, OnDestroy {
  private readonly attacksHistorySubComponentChangeDetectorRef = inject(ChangeDetectorRef);
  protected socket = inject(Socket);

  public currentMsg: Message;
  public msgList: Message[];
  public linkSaved = signal(0);

  //Icons
  arrowReturnLeft = arrowReturnLeft;
  clipboardCheck = clipboardCheck;
  share = share;

  constructor() {
    this.currentMsg = new Message();
    this.msgList = [];
  }

  ngOnInit() {
    this.socket.on('msgPage', (newMsgList: { list: object[] }) => {
      this.attacksHistorySubComponentChangeDetectorRef.markForCheck();
      this.msgList = newMsgList.list as typeof this.msgList;
    });

    this.socket.on('msgInfo', msgInfo => {
      this.attacksHistorySubComponentChangeDetectorRef.markForCheck();
      this.currentMsg = msgInfo;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('msgPage');
    this.socket.removeListener('msgInfo');
  }

  getCurrentMsg() {
    return this.currentMsg;
  }

  currentMsgReset() {
    this.currentMsg = new Message();
  }

  messageLoad(msg: Message) {
    this.linkSaved.set(0);

    if (msg.msg_id > 0) {
      if (!msg.msg_read) {
        msg.msg_read = 1;
      }
      this.socket.emit('msgInfo', msg.msg_id);
    } else {
      this.currentMsgReset();
    }
  }

  shareMsg() {
    this.socket.emit('msgShare', this.currentMsg.msg_id);
    this.currentMsg.msg_shared = (this.currentMsg.msg_shared + 1) % 2;
  }

  copyLink() {
    this.linkSaved.set(1);

    setTimeout(() => {
      this.attacksHistorySubComponentChangeDetectorRef.markForCheck();
      this.linkSaved.set(0);
    }, 2000);
  }

  back() {
    this.socket.emit('msgPage', {
      page: 1,
      category: this.currentMsg.msg_type,
    });
    this.currentMsgReset();
  }
}
