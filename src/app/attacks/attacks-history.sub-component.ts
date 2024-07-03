import { Component } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { Message } from 'src/services/message.class';

import arrowReturnLeft from '@iconify/icons-bi/arrow-return-left';
import clipboardCheck from '@iconify/icons-fa6-solid/clipboard-check';
import share from '@iconify/icons-bi/share';

@Component({
  selector: 'app-attacks-history',
  templateUrl: './attacks-history.sub-component.html',
  styleUrls: ['./attacks.component.css'],
})
export class AttacksHistorySubComponent {

  public currentMsg: Message;
  public msgList: Message[];
  public linkSaved: number;

  //Icons
  arrowReturnLeft = arrowReturnLeft;
  clipboardCheck = clipboardCheck;
  share = share;

  constructor(
    protected socket: Socket) {
    this.currentMsg = new Message();
    this.msgList = [];
    this.linkSaved = 0;
  }

  ngOnInit() {
    this.socket.on('msgPage', (newMsgList: { list: object[] }) => {
      this.msgList = newMsgList.list as typeof this.msgList;
    });

    this.socket.on('msgInfo', msgInfo => {
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
    this.linkSaved = 0;

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
    this.linkSaved = 1;

    setTimeout(() => {
      this.linkSaved = 0;
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
