import { Component, OnInit } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: '../html/login.component.html'
})

export class Login implements OnInit {

  loginForm: FormGroup;
  loginError: number;
  
  constructor(private socket: Socket, public user: User, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({});
    this.loginError = 0;
  }
  
  ngOnInit() {
    this.user.checkPermissions([0]);
    
    this.socket.on('connection', (data: string) => {
      console.log(data);
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
      username: '',
      password: ''
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('connection');
  }
  
  onSubmit(data:object) {
    this.socket.emit('connection', data);
  }
}
