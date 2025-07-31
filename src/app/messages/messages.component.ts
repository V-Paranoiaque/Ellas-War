import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Message } from 'src/services/message.class';
import { ClipboardModule } from 'ngx-clipboard';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';
import { MessagesContentSubComponent } from './messages-content.sub-component';
import { MessagesPopupSubComponent } from './messages-popup.sub-component';
import { MessagesTitleSubComponent } from './messages-title.sub-component';
import { MessagesAbstractComponent } from './messages-abstract.component';

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

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  imports: [
    ClipboardModule,
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    MessagesContentSubComponent,
    MessagesPopupSubComponent,
    MessagesTitleSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class MessagesComponent
  extends MessagesAbstractComponent
  implements OnInit, OnDestroy
{
  public dummyMsg: Message;

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

  constructor() {
    super();

    this.dummyMsg = new Message();
  }

  getCurrentMsg() {
    return this.currentMsg;
  }
  getDeleteMode() {
    return this.deleteMode;
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
    const id = parseInt((event.target as HTMLInputElement).value);

    if (id >= 1) {
      this.currentPage = id;
      this.socket.emit('msgPage', {
        page: this.currentPage,
        category: this.currentCategory,
      });
    }
  }

  setAllRead() {
    this.socket.emit('msgSetRead');
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
