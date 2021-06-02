import { Component, OnInit } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../environments/environment';

import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  templateUrl: '../html/login.component.html'
})

export class Login implements OnInit {

  loginForm: FormGroup;
  loginError: number;
  
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;
  
  constructor(private socket: Socket, public user: User, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({});
    this.loginError = 0;
  }
  
  ngOnInit() {
    this.user.checkPermissions([0]);
    
    this.socket.on('connection', (data: string) => {
      if(data) {
        this.socket.emit('ewAuth', {'token': data});
        localStorage.setItem('token', data);
      }
      else {
        this.loginError = 1;
        localStorage.removeItem('token');
      }
    });
    
    this.loginForm = this.formBuilder.group({
      server: this.socket.server,
      username: '',
      password: '',
      mobile: environment.mobile
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('connection');
  }
  
  onSubmit(data:object) {
    this.socket.emit('connection', data);
  }
  
  selectServer() {
    if(environment.mobile == 1 || this.socket.local) {
      this.socket.makeConnection(this.loginForm.controls['server'].value);
    }
    else {
      //Redirect to the selected server
      this.socket.redirect(this.loginForm.controls['server'].value);
    }
  }
}
