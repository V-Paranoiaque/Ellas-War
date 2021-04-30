import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'

import { CommonTopBar } from './common-top-bar.component';

import cog from '@iconify/icons-fa-solid/cog';
import powerOff from '@iconify/icons-fa-solid/power-off';

@Component({
  selector: 'paused-top-bar',
  templateUrl: '../html/paused-top-bar.component.html',
  styleUrls: ['../css/paused-top-bar.component.css']
})

export class PausedTopBar extends CommonTopBar {
  
  cog      = cog;
  powerOff = powerOff;
  
  constructor(socket: Socket, 
              router: Router, public user: User) {
    super(socket, router, user);
  }
  
  ngOnInit() {
    if(this.active == 'home' || this.active == 'login') {
      this.router.navigate(['/paused'])
    }
  }
  
  disconnect() {
    localStorage.removeItem('token');
    this.socket.emit('deconnection');
    document.location.href="/";
  }
}
