import { Component, OnInit, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'common-top-bar',
  templateUrl: '../html/common-top-bar.component.html'
})

export class CommonTopBar implements OnInit {
  
  @Input()
  active: string;
  
  constructor(protected socket: Socket, 
              protected router: Router, public user: User) {
    this.active = '';
  }
  
  ngOnInit() {
    let localToken = localStorage.getItem('token');
    
    if(localToken) {
      this.socket.emit('ewAuth', {'token': localToken});
    }
    this.socket.socket.on('user', (data: any) => {
      if(data) {
        this.user.setUser(data)
      }
    });
    this.socket.socket.on('ress', (data: any) => {
      if(data) {
        this.user.setUserRess(data)
      }
    });
    this.socket.socket.on('redirect', function() {
      document.location.href="/";
    });
  }
  
}
