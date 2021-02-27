import { Component, OnInit } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: '../html/login.component.html'
})

export class Login implements OnInit {

  loginForm: FormGroup;
  
  constructor(private socket: Socket, public user: User, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({});
    
    this.socket.socket.on('connection', (data: string) => {
      if(data) {
        this.socket.emit('ewAuth', {'token': data});
        localStorage.setItem('token', data);
      }
      else {
        localStorage.removeItem('token');
      }
    });
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }
  
  onSubmit(data:object) {
    this.socket.emit('connection', data);
  }
}
