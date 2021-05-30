import { Component, OnInit, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'

import greekcolumnIcon from '@iconify/icons-whh/greekcolumn';
import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  selector: 'common-top-bar',
  templateUrl: '../html/common-top-bar.component.html'
})

export class CommonTopBar implements OnInit {
  
  @Input()
  active: string;
  
  greekcolumnIcon = greekcolumnIcon;
  questionCircle  = questionCircle;
  
  constructor(protected socket: Socket, 
              protected router: Router, public user: User) {
    this.active = '';
  }
  
  ngOnInit() {
    this.socket.on('user', (data: any) => {
      if(data) {
        this.user.setUser(data)
      }
    });
    this.socket.on('ress', (data: any) => {
      if(data) {
        this.user.setUserRess(data)
      }
    });
    this.socket.on('redirect', () => {
      this.router.navigate(['/'])
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('user');
    this.socket.removeListener('ress');
    this.socket.removeListener('redirect');
  }
  
  disconnect() {
    this.user.disconnect();
  }
}
