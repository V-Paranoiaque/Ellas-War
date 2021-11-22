import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { Router } from '@angular/router'

import { CommonTopBarComponent } from './common-top-bar.component';
import { BsModalService } from 'ngx-bootstrap/modal';

import cog from '@iconify/icons-fa-solid/cog';
import powerOff from '@iconify/icons-fa-solid/power-off';

@Component({
  selector: 'app-blocked-top-bar',
  templateUrl: '../html/blocked-top-bar.component.html',
  styleUrls: ['../css/blocked-top-bar.component.css']
})

export class BlockedTopBarComponent extends CommonTopBarComponent implements OnInit {
  
  cog      = cog;
  powerOff = powerOff;
  
  constructor(protected http: HttpClient, socket: Socket, 
              router: Router, public user: User,
              protected modalService: BsModalService) {
    super(http, socket, router, user, modalService);
  }
  
  ngOnInit() {
    if(this.active == 'home' || this.active == 'login') {
      this.router.navigate(['/blocked'])
    }
  }
}
