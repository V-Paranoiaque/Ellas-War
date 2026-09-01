import {
  ChangeDetectorRef,
  Component,
  OnInit,
  DestroyRef,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { UserComponent as User } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Message } from '../../services/message.class';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  template: '',
})
export class MessagesAbstractComponent implements OnInit, OnDestroy {
  private readonly messagesAbstractComponentChangeDetectorRef = inject(ChangeDetectorRef);
  protected http = inject(HttpClient);
  user = inject(User);
  protected socket = inject(Socket);
  translate = inject(TranslateService);
  protected scroller = inject(ViewportScroller);
  private readonly destroyRef = inject(DestroyRef);

  public addDestError = signal(0);
  public currentPage: number;
  public noDestError: number;
  public textError;
  protected msgList: Message[];
  protected msgPageNb: number;
  public msgPrivateNb: number;
  public msgSent: number;
  public msgToUser: string;
  public categoryList: number[];
  public currentCategory: number;
  protected currentMsg: Message;
  protected deleteMode: number;
  protected newMessageMode: number;
  protected destList: { id: number; username: string }[];
  public reported = 0;
  public answerText: string;
  public linkSaved = signal(0);
  public msgTitle: string;
  public msgText: string;

  private subMsg: Subscription;

  constructor() {
    this.currentPage = 1;
    this.noDestError = 0;
    this.textError = 0;
    this.msgList = [];
    this.msgPageNb = 1;
    this.msgPrivateNb = 0;
    this.msgSent = 0;
    this.msgToUser = '';
    this.categoryList = [];
    this.currentCategory = 0;
    this.currentMsg = new Message();
    this.deleteMode = 0;
    this.newMessageMode = 0;
    this.destList = [];
    this.answerText = '';
    this.msgTitle = '';
    this.msgText = '';

    this.subMsg = new Subscription();
  }

  ngOnInit() {
    this.user.checkPermissions([1]);
    this.socket.emit('msgPrivateNb');

    this.subMsg = this.socket.onChange.subscribe({
      next: (event: { action: string; username: string }) => {
        this.messagesAbstractComponentChangeDetectorRef.markForCheck();
        if (event.action === 'addDest') {
          this.addDestGUi(event.username);
        }
      },
    });
    this.socket.on('msgCategoryList', categoryList => {
      this.messagesAbstractComponentChangeDetectorRef.markForCheck();
      this.categoryList = categoryList;
    });

    this.socket.on('msgPage', (newMsgList: { list: object[]; nb: number }) => {
      this.messagesAbstractComponentChangeDetectorRef.markForCheck();
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

    this.socket.on('msgInfo', (msgInfo: object) => {
      this.messagesAbstractComponentChangeDetectorRef.markForCheck();
      this.currentMsg = msgInfo as typeof this.currentMsg;
      this.reported = 0;
      setTimeout(() => {
        this.messagesAbstractComponentChangeDetectorRef.markForCheck();
        this.scroller.scrollToAnchor('msgBlock');
      }, 100);
    });

    this.socket.on('msgPrivateNb', msgPrivateNb => {
      this.messagesAbstractComponentChangeDetectorRef.markForCheck();
      this.msgPrivateNb = msgPrivateNb;
    });

    this.socket.on('msgRefresh', () => {
      this.messagesAbstractComponentChangeDetectorRef.markForCheck();
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
    this.subMsg.unsubscribe();
  }

  addDestGUi(username: number | string) {
    this.addDest(username, () => {
      return;
    });
  }

  getDestList() {
    return this.destList;
  }

  addDest(username: number | string, callback: () => void) {
    this.addDestError.set(0);
    this.noDestError = 0;
    this.textError = 0;
    if (
      (typeof username === 'string' && username.length === 0) ||
      (typeof username === 'number' && username === 0)
    ) {
      callback();
      return;
    }

    const url =
      this.socket.url + '/api/playerProfile/' + username.toString() + '.json';

    this.http
      .get(url)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.messagesAbstractComponentChangeDetectorRef.markForCheck();
        const res = result as { membre_id: number; username: string };
        if (res.membre_id) {
          this.removeDest(res.membre_id);
          this.destList.push({
            id: res.membre_id,
            username: res.username,
          });
        } else {
          this.addDestError.set(1);
        }

        callback();
      });

    this.msgToUser = '';
  }

  reinitDest() {
    this.destList = [];
  }

  removeDest(id: number) {
    for (const i in this.destList) {
      if (this.destList[i].id === id) {
        this.destList.splice(parseInt(i), 1);
      }
    }
  }

  messageLoad(msg: Message) {
    this.linkSaved.set(0);

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

  getMsgPageNb() {
    return this.msgPageNb;
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
}
