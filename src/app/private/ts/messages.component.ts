import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import clipboardCheck from '@iconify/icons-fa-solid/clipboard-check';
import brushIcon from '@iconify/icons-bi/brush';
import envelopeFill from '@iconify/icons-bi/envelope-fill';
import plusIcon from '@iconify/icons-bi/plus';
import share from '@iconify/icons-bi/share';
import trash2Icon from '@iconify/icons-bi/trash2';
import trashIcon from '@iconify/icons-bi/trash';
import xIcon from '@iconify/icons-bi/x';

@Component({
  templateUrl: '../html/messages.component.html',
  styleUrls: ['../css/messages.component.css']
})

export class MessagesComponent implements OnInit, OnDestroy {
  public addDestError: number;
  public answerText: string;
  public currentPage: number;
  public linkSaved: number;
  public msgSent: number;
  public msgToUser: string;
  public msgTitle: string;
  public msgText: string;
  
  private currentCategory: number;
  private msgList: any;
  private msgPageNb: number;
  private currentMsg: any;
  private deleteMode: number;
  private destList: any;
  private sub:any;
  private subMsg:any;
  
  //Icons
  brushIcon    = brushIcon;
  clipboardCheck = clipboardCheck;
  envelopeFill = envelopeFill;
  plusIcon     = plusIcon;
  share        = share;
  trash2Icon   = trash2Icon;
  trashIcon    = trashIcon;
  xIcon        = xIcon;
  
  constructor(protected http: HttpClient, public user: User, protected socket: Socket,
              public translate: TranslateService) {
    this.addDestError = 0;
    this.answerText = '';
    this.currentPage = 1;
    this.linkSaved = 0;
    this.msgSent = 0;
    this.msgToUser = '';
    this.msgTitle = '';
    this.msgText = '';
    
    this.currentCategory = 0;
    this.msgList = [];
    this.msgPageNb = 1;
    this.currentMsg = {
      id: 0,
      content: '',
      msg_type: 0
    };
    this.deleteMode = 0;
    this.destList = [];
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.subMsg = this.socket.onChange.subscribe({
      next: (event: any) => {
        if(event.action == 'addDest') {
          this.addDest(event.username);
        }
      }
    })
    
    this.socket.on('msgPage', (newMsgList:any) => {
      for(let i in newMsgList.list) {
        newMsgList.list[i].isChecked = true;
      }
      this.msgList   = newMsgList.list;
      this.msgPageNb = newMsgList.nb;
      
      if(this.currentPage > newMsgList.nb) {
        this.currentPage = parseInt(newMsgList.nb);
        
        //If the requested page was too high
        this.setPage(this.currentPage);
      }
    });
    
    this.socket.on('msgInfo', (msgInfo:any) => {
      this.currentMsg = msgInfo;
    });
    
    this.socket.on('msgRefresh', () => {
      this.setPage(this.currentPage);
      this.messageLoad({'msg_id': this.currentMsg.id});
    });
    
    this.setPage(this.currentPage);
  }
  
  ngOnDestroy() {
    this.socket.removeListener('msgPage');
    this.socket.removeListener('msgInfo');
    this.socket.removeListener('msgRefresh');
    if(this.sub) {
      this.sub.unsubscribe();
    }
    if(this.subMsg) {
      this.subMsg.unsubscribe();
    }
  }
  
  addDest(username:string, callback:any=null) {
    this.addDestError = 0;
    if(username.length === 0) {
      if(callback) {
        callback();
      }
      return;
    }
    
    let url = this.socket.url+'/api/playerProfile/'+username+'.json';
    
    this.sub = this.http.get(url).subscribe((res:any) => {
      if(res && res.membre_id) {
        this.removeDest(res.membre_id);
        this.destList.push({
          'id': res.membre_id,
          'username': res.username
        });
      }
      else if(!callback) {
        this.addDestError = 1;
      }
      
      if(callback) {
        callback();
      }
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
    if(this.answerText && this.answerText.length > 0) {
      let msg = {
        'id': this.currentMsg.id,
        'text': this.answerText.trim()
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
  
  messageLoad(msg:any) {
    let id = msg.msg_id;
    this.msgSent = 0;
    this.linkSaved = 0;
    
    if(id > 0) {
      if(!msg.msg_read) {
        msg.msg_read = 1;
      }
      this.socket.emit('msgInfo', id);
    }
    else {
      this.currentMsg = {
        id: 0,
        content: '',
        msg_type: 0
      };
      
      //Reinit inputs
      this.msgToUser = '';
      this.msgTitle = '';
      this.msgText = '';
      this.destList = [];
    }
    
    if(id != this.currentMsg.id) {
      this.answerText = '';
    }
  }
  
  messageDelete() {
    this.socket.emit('msgDelete', this.currentMsg.id);
    this.messageLoad({'msg_id': 0});
  }
  
  messageDeleteMultiple() {
    let list:any = {};
    
    for(let i in this.msgList) {
      if(this.msgList[i].isChecked) {
        list['id_'+this.msgList[i].msg_id] = 1;
      }
    }
    
    this.socket.emit('msgDeleteMultiple', list);
    this.messageLoad({'msg_id': 0});
  }
  
  pageLoad(event:any) {
    let id = event.target.value;
    
    if(id >= 1) {
      this.currentPage = id;
      this.socket.emit('msgPage', {
        'page': this.currentPage,
        'category': this.currentCategory
      });
    }
  }
  
  removeDest(id:number) {
    for(let i in this.destList) {
      if(this.destList[i].id == id) {
        this.destList.splice(i, 1); 
      }
    }
  }
  
  send() {
    this.addDest(this.msgToUser, () => {
      let list = new Array();
      for(let i in this.destList){
        list.push(this.destList[i].id)
      }
      
      if(this.msgTitle && this.msgText) {
        let title  = this.msgTitle.trim();
        let content= this.msgText.trim();
        
        if(title.length > 0 && content.length > 0 && list.length > 0) {
          let msg = {
            'list': list,
            'title': title,
            'content': content
          };
          this.socket.emit('msgNew', msg);
          this.msgTitle = '';
          this.msgText = '';
          this.destList = [];
          this.msgSent = 1;
        }
      }
    });
  }
  
  setAllRead() {
    this.socket.emit('msgSetRead');
  }
  
  setPage(id:number, i:number=0) {
    id += i;
    if(id >= 1 && id <= this.getMsgPageNb()) {
      this.currentPage = id;
      this.socket.emit('msgPage', {
        'page': this.currentPage,
        'category': this.currentCategory
      });
    }
  }
  
  shareMsg() {
    this.socket.emit('msgShare', this.currentMsg.id);
    this.currentMsg.msg_shared = (this.currentMsg.msg_shared+1)%2;
  }
  
  switchDeleteMode() {
    this.deleteMode = (this.deleteMode+1)%2;
  }
}
