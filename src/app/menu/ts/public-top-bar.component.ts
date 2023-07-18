import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import { CommonTopBarComponent } from './common-top-bar.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-public-top-bar',
  templateUrl: '../html/public-top-bar.component.html',
  styleUrls: ['../css/public-top-bar.component.css']
})

export class PublicTopBarComponent extends CommonTopBarComponent implements OnInit {
  
  @Input()
  active: string;
  loginForm: FormGroup;
  
  constructor(protected http: HttpClient, socket: Socket, private formBuilder: FormBuilder, 
              router: Router, public user: User,
              protected modalService: BsModalService) {
    super(http, socket, router, user, modalService);
    
    this.loginForm = this.formBuilder.group({});
    this.active = '';
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }
  
  onSubmit(data:object) {
    this.router.navigateByUrl('login');
    const info = data as {username:string,password:string}
    this.socket.emit('connection', {
      username: info.username,
      password: info.password,
      extra: this.user.getExtra()
    });
  }
}
