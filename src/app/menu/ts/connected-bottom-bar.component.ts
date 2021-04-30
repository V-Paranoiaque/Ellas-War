import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

import { CommonBottomBar } from './common-bottom-bar.component';

import comments from '@iconify/icons-fa-solid/comments';

@Component({
  selector: 'connected-bottom-bar',
  templateUrl: '../html/connected-bottom-bar.component.html',
  styleUrls: ['../css/connected-bottom-bar.component.css']
})

export class ConnectedBottomBar extends CommonBottomBar {
  
  public chatActive:string;
  
  public chat_user_players:any;
  public chat_user_msgs:any;
  public chatUserMsg:string;
  public chat_user_nb:number;
  
  public chat_alli_players:any;
  public chat_alli_msgs:any;
  public chatAlliMsg:string;
  public chat_alli_nb:number;
  
  @ViewChild('chatGeneral') private chatGeneralScroll?: ElementRef;
  @ViewChild('chatAlliance') private chatAllianceScroll?: ElementRef;
  
  comments = comments;
  
  constructor(protected socket: Socket, 
              public router: Router, public user: User) {
    super(socket, user);
    
    this.chatActive = '';
    
    this.chat_user_players = [];
    this.chat_user_msgs  = [];
    this.chatUserMsg = '';
    this.chat_user_nb = 0;
    
    this.chat_alli_players = [];
    this.chat_alli_msgs = [];
    this.chatAlliMsg = '';
    this.chat_alli_nb = 0;
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.socket.emit("chatUserPlayers");
      this.socket.emit("chatUserMsgs");
      this.socket.emit("chatAlliPlayers");
      this.socket.emit("chatAlliMsgs");
    });
    
    /*** General Chat ***/
    this.socket.on('chatUserPlayers', (players:any) => {
      this.chat_user_players = players;
    });
    this.socket.on('chatUserPlayersRefresh', () => {
      this.socket.emit("chatUserPlayers");
    });
    this.socket.on('chatUserMsgs', (msgs:any) => {
      this.chat_user_msgs = msgs;
    });
    
    this.socket.on('chatUserMsg', (msg:string) => {
      this.chat_user_msgs.push(msg[0]);
      if(this.chatActive != 'general') {
        this.chat_user_nb++;
      }
    });
    
    /*** Alliance chat ***/
    this.socket.on('chatAlliPlayers', (players:any) => {
      this.chat_alli_players = players;
    });
    this.socket.on('chatAlliPlayersRefresh', () => {
      this.socket.emit("chatAlliPlayers");
    });
    this.socket.on('chatAlliMsgs', (msgs:any) => {
      this.chat_alli_msgs = msgs;
    });
    this.socket.on('chatAlliMsg', (msg:string) => {
      this.chat_alli_msgs.push(msg[0]);
      if(this.chatActive != 'alliance') {
        this.chat_alli_nb++;
      }
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('chatUserPlayers');
    this.socket.removeListener('chatUserPlayersRefresh');
    this.socket.removeListener('chatUserMsgs');
    this.socket.removeListener('chatUserMsg');
    
    this.socket.removeListener('chatAlliPlayers');
    this.socket.removeListener('chatAlliPlayersRefresh');
    this.socket.removeListener('chatAlliMsgs');
    this.socket.removeListener('chatAlliMsg');
  }
  
  chatUserSend() {
    let msg = this.chatUserMsg.trim();
    if(msg.length > 0) {
      this.socket.emit("chatUserMsg", msg);
      this.chatUserMsg = '';
    }
    
  }
  chatAlliSend() {
    let msg = this.chatAlliMsg.trim();
    if(msg.length > 0) {
      this.socket.emit("chatAlliMsg", msg);
      this.chatAlliMsg = '';
    }
  }
  chatOpenMobile() {
    if(this.chatActive == '') {
      this.chatActive = 'general';
      setTimeout(() => {
        this.chatGeneralScroll?.nativeElement.scroll({
          top: 999999,
          left: 0,
          behavior: 'auto'
        });
      }, 0);
    }
    else if(this.user.getPropertyNb('alliance') > 0 &&
            this.chatActive == 'general') {
      this.chatActive = 'alliance';
      setTimeout(() => {
        this.chatAllianceScroll?.nativeElement.scroll({
          top: 999999,
          left: 0,
          behavior: 'auto'
        });
      }, 0);
    }
    else {
      this.chatActive = '';
    }
  }
  
  toggle(chat:string) {
    if(this.chatActive == chat) {
      this.chatActive = '';
    }
    else {
      this.chatActive = chat;
    }
    if(this.chatActive == 'general') {
      this.chat_user_nb = 0;
      setTimeout(() => {
        this.chatGeneralScroll?.nativeElement.scroll({
          top: 999999,
          left: 0,
          behavior: 'auto'
        });
      }, 0);
    }
    else if(this.chatActive == 'alliance') {
      this.chat_alli_nb = 0;
      setTimeout(() => {
        this.chatAllianceScroll?.nativeElement.scroll({
          top: 999999,
          left: 0,
          behavior: 'auto'
        });
      }, 0);
    }
  }
}
