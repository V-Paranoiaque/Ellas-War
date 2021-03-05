import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'

import { CommonTopBar } from './common-top-bar.component';

import cog from '@iconify/icons-fa-solid/cog';
import comments from '@iconify/icons-fa-solid/comments';
import powerOff from '@iconify/icons-fa-solid/power-off';

@Component({
  selector: 'blocked-top-bar',
  templateUrl: '../html/blocked-top-bar.component.html',
  styleUrls: ['../css/blocked-top-bar.component.css']
})

export class BlockedTopBar extends CommonTopBar {
  
  cog      = cog;
  comments = comments;
  powerOff = powerOff;
  
  constructor(socket: Socket, 
              router: Router, public user: User) {
    super(socket, router, user);
  }
  
  ngOnInit() {
    if(this.active == 'home' || this.active == 'login') {
      this.router.navigate(['/blocked'])
    }
  }
  
  disconnect() {
    localStorage.removeItem('token');
    this.socket.emit('deconnection');
    document.location.href="/";
  }
}
