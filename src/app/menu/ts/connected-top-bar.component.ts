import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'

import { CommonTopBar } from './common-top-bar.component';

import cog from '@iconify/icons-fa-solid/cog';
import comments from '@iconify/icons-fa-solid/comments';
import powerOff from '@iconify/icons-fa-solid/power-off';

@Component({
  selector: 'connected-top-bar',
  templateUrl: '../html/connected-top-bar.component.html',
  styleUrls: ['../css/connected-top-bar.component.css']
})

export class ConnectedTopBar extends CommonTopBar {
  
  @Input()
  
  cog      = cog;
  comments = comments;
  powerOff = powerOff;
  
  constructor(socket: Socket, 
              router: Router, public user: User) {
    super(socket, router, user);
    
    let audio = new Audio();
    audio.src = "../../assets/audio/2042.mp3";
    audio.load();
    
    this.socket.socket.on('msgNewNb', (nb:number) => {
      this.user.setNewMsg(nb)
      
      if(user.getPropertyNb('sound') == 1) {
        audio.play();
      }
    });
  }
  
  ngOnInit() {
    if(this.active == 'home' || this.active == 'login') {
      this.router.navigate(['/city'])
    }
    
    setTimeout(() => {
      this.socket.emit('msgNewNb');
    }, 0);
  }
  
  disconnect() {
    localStorage.removeItem('token');
    this.socket.emit('deconnection');
    document.location.href="/";
  }
}
