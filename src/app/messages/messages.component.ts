import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserComponent as User } from '../../services/user.service';

import clipboardCheck from '@iconify/icons-fa6-solid/clipboard-check';
import brushIcon from '@iconify/icons-bi/brush';
import envelopeFill from '@iconify/icons-bi/envelope-fill';
import envelopeSlashFill from '@iconify/icons-bi/envelope-slash-fill';
import plusIcon from '@iconify/icons-bi/plus';
import share from '@iconify/icons-bi/share';
import trash2Icon from '@iconify/icons-bi/trash2';
import trashIcon from '@iconify/icons-bi/trash';
import triangleExclamation from '@iconify/icons-fa6-solid/triangle-exclamation';
import xIcon from '@iconify/icons-bi/x';
import { Message } from 'src/services/message.class';

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  public addDestError: number;
  public noDestError: number;
  public textError;
  public answerText: string;
  public currentPage: number;
  public linkSaved: number;
  public msgSent: number;
  public msgToUser: string;
  public msgTitle: string;
  public msgText: string;
  public categoryList: number[];
  public msgPrivateNb: number;
  public reported = 0;

  public currentCategory: number;
  private msgList: Message[];
  private msgPageNb: number;
  private currentMsg: Message;
  public dummyMsg: Message;
  private deleteMode: number;
  private newMessageMode: number;
  private destList: { id: number; username: string }[];
  private sub: Subscription;
  private subMsg: Subscription;

  //Icons
  brushIcon = brushIcon;
  clipboardCheck = clipboardCheck;
  envelopeFill = envelopeFill;
  envelopeSlashFill = envelopeSlashFill;
  plusIcon = plusIcon;
  share = share;
  trash2Icon = trash2Icon;
  trashIcon = trashIcon;
  triangleExclamation = triangleExclamation;
  xIcon = xIcon;

  constructor(
    protected http: HttpClient,
    public user: User,
    protected socket: Socket,
    public translate: TranslateService,
    protected scroller: ViewportScroller
  ) {
    this.addDestError = 0;
    this.noDestError = 0;
    this.textError = 0;
    this.answerText = '';
    this.currentPage = 1;
    this.linkSaved = 0;
    this.msgSent = 0;
    this.msgToUser = '';
    this.msgTitle = '';
    this.msgText = '';

    this.categoryList = [];
    this.msgPrivateNb = 0;
    this.currentCategory = 0;
    this.msgList = [];
    this.msgPageNb = 1;
    this.currentMsg = new Message();
    this.dummyMsg = new Message();
    this.deleteMode = 0;
    this.newMessageMode = 0;
    this.destList = [];
    this.sub = new Subscription();
    this.subMsg = new Subscription();
  }

  ngOnInit() {
    this.user.checkPermissions([1]);
    this.socket.emit('msgPrivateNb');

    this.subMsg = this.socket.onChange.subscribe({
      next: (event: { action: string; username: string }) => {
        if (event.action === 'addDest') {
          this.addDestGUi(event.username);
        }
      },
    });

    this.socket.on('msgCategoryList', categoryList => {
      this.categoryList = categoryList;
    });

    this.socket.on('msgPage', (newMsgList: { list: object[]; nb: number }) => {
      this.msgList = newMsgList.list as typeof this.msgList;
      for (const i in newMsgList.list) {
        this.msgList[i].isChecked = true;
      }
      this.msgPageNb = newMsgList.nb;

      if (this.currentPage > newMsgList.nb) {
        this.currentPage = newMsgList.nb;

        //If the requested page was too high
        this.setPage(this.currentPage);
      }
    });

    this.socket.on('msgInfo', msgInfo => {
      this.currentMsg = msgInfo;
      this.reported = 0;
      setTimeout(() => {
        this.scroller.scrollToAnchor('msgBlock');
      }, 100);
    });

    this.socket.on('msgPrivateNb', msgPrivateNb => {
      this.msgPrivateNb = msgPrivateNb;
    });

    this.socket.on('msgRefresh', () => {
      this.setPage(this.currentPage);
      this.currentMsg.msg_read = 0;
      this.messageLoad(this.currentMsg);
      this.socket.emit('msgCategoryList');
      this.socket.emit('msgPrivateNb');
    });

    this.setPage(this.currentPage);
    this.socket.emit('msgCategoryList');
  }

  ngOnDestroy() {
    this.socket.removeListener('msgCategoryList');
    this.socket.removeListener('msgPage');
    this.socket.removeListener('msgInfo');
    this.socket.removeListener('msgRefresh');
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.subMsg) {
      this.subMsg.unsubscribe();
    }
  }

  addDestGUi(username: number | string) {
    this.addDest(username, () => {
      return;
    });
  }

  addDest(username: number | string, callback: () => void) {
    this.addDestError = 0;
    this.noDestError = 0;
    this.textError = 0;
    if (
      (typeof username === 'string' && username.length === 0) ||
      (typeof username === 'number' && username === 0)
    ) {
      callback();
      return;
    }

    const url = this.socket.url + '/api/playerProfile/' + username + '.json';

    this.sub = this.http.get(url).subscribe(result => {
      const res = result as { membre_id: number; username: string };
      if (res?.membre_id) {
        this.removeDest(res.membre_id);
        this.destList.push({
          id: res.membre_id,
          username: res.username,
        });
      } else {
        this.addDestError = 1;
      }

      callback();
    });

    this.msgToUser = '';
  }

  getCurrentMsg() {
    return this.currentMsg;
  }
  getDeleteMode() {
    return this.deleteMode;
  }
  getDestList() {
    return this.destList;
  }
  getMsgPageNb() {
    return this.msgPageNb;
  }
  getMsgList() {
    return this.msgList;
  }

  answer() {
    if (this.answerText && this.answerText.length > 0) {
      const msg = {
        id: this.currentMsg.msg_id,
        text: this.answerText.trim(),
      };
      this.socket.emit('msgAnswer', msg);
      this.answerText = '';
    }
  }

  copyLink() {
    this.linkSaved = 1;

    setTimeout(() => {
      this.linkSaved = 0;
    }, 2000);
  }

  messageLoad(msg: Message) {
    this.linkSaved = 0;

    if (msg.msg_id > 0) {
      this.msgSent = 0;

      if (!msg.msg_read) {
        msg.msg_read = 1;
      }
      this.socket.emit('msgInfo', msg.msg_id);
    } else {
      this.currentMsg = new Message();

      //Reinit inputs
      this.msgToUser = '';
      this.msgTitle = '';
      this.msgText = '';
      this.destList = [];
    }

    if (msg.msg_id != this.currentMsg.msg_id) {
      this.answerText = '';
    }
  }

  messageDelete() {
    this.socket.emit('msgDelete', this.currentMsg.msg_id);
    this.messageLoad(this.dummyMsg);
  }

  messageDeleteMultiple() {
    const list = new Map<string, number>();

    for (const i in this.msgList) {
      if (this.msgList[i].isChecked) {
        list.set('id_' + this.msgList[i].msg_id, 1);
      }
    }
    this.socket.emit('msgDeleteMultiple', Object.fromEntries(list));
    this.messageLoad(this.dummyMsg);
  }

  pageLoad(event: Event) {
    const id = parseInt((event?.target as HTMLInputElement)?.value);

    if (id >= 1) {
      this.currentPage = id;
      this.socket.emit('msgPage', {
        page: this.currentPage,
        category: this.currentCategory,
      });
    }
  }

  removeDest(id: number) {
    for (const i in this.destList) {
      if (this.destList[i].id === id) {
        this.destList.splice(parseInt(i), 1);
      }
    }
  }

  reinitDest() {
    this.destList = [];
  }

  send() {
    this.noDestError = 0;
    this.textError = 0;
    this.addDest(this.msgToUser, () => {
      const list = [];
      for (const i in this.destList) {
        list.push(this.destList[i].id);
      }

      if (list.length === 0) {
        this.noDestError = 1;
        return;
      }

      if (this.msgTitle && this.msgText) {
        const title = this.msgTitle.trim();
        const content = this.msgText.trim();

        if (title.length > 0 && content.length > 0) {
          const msg = {
            list: list,
            title: title,
            content: content,
          };
          this.socket.emit('msgNew', msg);
          this.msgTitle = '';
          this.msgText = '';
          this.destList = [];
          this.msgSent = 1;
        }
      } else {
        this.textError = 1;
      }
    });
  }

  setAllRead() {
    this.socket.emit('msgSetRead');
  }

  setPage(id: number, i = 0) {
    id += i;
    if (id >= 1 && id <= this.getMsgPageNb()) {
      this.currentPage = id;
      this.socket.emit('msgPage', {
        page: this.currentPage,
        category: this.currentCategory,
        unread: this.newMessageMode,
      });
    }
  }

  shareMsg() {
    this.socket.emit('msgShare', this.currentMsg.msg_id);
    this.currentMsg.msg_shared = (this.currentMsg.msg_shared + 1) % 2;
  }

  switchDeleteMode() {
    this.deleteMode = (this.deleteMode + 1) % 2;
  }

  switchMessageMode() {
    this.newMessageMode = (this.newMessageMode + 1) % 2;
    this.msgPageNb = 1;
    this.setPage(1);
  }

  selectPlayerMessages() {
    this.currentCategory = 2;
    this.newMessageMode = 1;
    this.msgPageNb = 1;
    this.setPage(1);
  }

  report() {
    this.reported = 1;
    this.socket.emit('problemReport', { type: 0, id: this.currentMsg.msg_id });
  }
}
