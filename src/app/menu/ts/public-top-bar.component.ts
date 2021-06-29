import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

import { CommonTopBar } from './common-top-bar.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'public-top-bar',
  templateUrl: '../html/public-top-bar.component.html',
  styleUrls: ['../css/public-top-bar.component.css']
})

export class PublicTopBar extends CommonTopBar {
  
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
    this.socket.emit('connection', data);
  }
}
