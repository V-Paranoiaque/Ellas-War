import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'admin-left-menu',
  templateUrl: '../html/admin-left-menu.component.html',
  styleUrls: ['../css/admin-left-menu.component.css']
})

export class AdminLeftMenu {
  
  constructor(socket: Socket, 
              router: Router, public user: User) {
  }
  
  ngOnInit() {
  }
}