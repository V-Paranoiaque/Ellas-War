import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'

import { CommonTopBar } from './common-top-bar.component';
import { BsModalService } from 'ngx-bootstrap/modal';

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
  
  constructor(protected http: HttpClient, socket: Socket, 
              router: Router, public user: User,
              protected modalService: BsModalService) {
    super(http, socket, router, user, modalService);
  }
  
  ngOnInit() {
    if(this.active == 'home' || this.active == 'login') {
      this.router.navigate(['/paused'])
    }
  }
}
