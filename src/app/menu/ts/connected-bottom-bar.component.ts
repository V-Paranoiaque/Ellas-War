import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

import { CommonBottomBar } from './common-bottom-bar.component';

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
  
  constructor(protected socket: Socket, public user: User) {
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
    
    setTimeout(() => {
      this.socket.emit("chatUserPlayers");
      this.socket.emit("chatUserMsgs");
      this.socket.emit("chatAlliPlayers");
      this.socket.emit("chatAlliMsgs");
    });
    
    /*** General Chat ***/
    this.socket.socket.on('chatUserPlayers', (players:any) => {
      this.chat_user_players = players;
    });
    this.socket.socket.on('chatUserPlayersRefresh', () => {
      this.socket.emit("chatUserPlayers");
    });
    this.socket.socket.on('chatUserMsgs', (msgs:any) => {
      this.chat_user_msgs = msgs;
    });
    
    this.socket.socket.on('chatUserMsg', (msg:string) => {
      this.chat_user_msgs.push(msg[0]);
      if(this.chatActive != 'general') {
        this.chat_user_nb++;
      }
    });
    
    /*** Alliance chat ***/
    this.socket.socket.on('chatAlliPlayers', (players:any) => {
      this.chat_alli_players = players;
    });
    this.socket.socket.on('chatAlliPlayersRefresh', (players:any) => {
      this.socket.emit("chatAlliPlayers");
    });
    this.socket.socket.on('chatAlliMsgs', (msgs:any) => {
      this.chat_alli_msgs = msgs;
    });
    this.socket.socket.on('chatAlliMsg', (msg:string) => {
      this.chat_alli_msgs.push(msg[0]);
      if(this.chatActive != 'alliance') {
        this.chat_alli_nb++;
      }
    });
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
  toggle(chat:string) {
    if(this.chatActive == chat) {
      this.chatActive = '';
    }
    else {
      this.chatActive = chat;
    }
    if(this.chatActive == 'general') {
      this.chat_user_nb = 0;
    }
    else if(this.chatActive == 'alliance') {
      this.chat_alli_nb = 0;
    }
  }
}
