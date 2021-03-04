import { Component, OnInit } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: '../html/register.component.html'
})

export class Register implements OnInit {
  
  registerForm: FormGroup;
  
  constructor(private socket: Socket, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({});
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
  }
  
  onSubmit(data:object) {
    this.socket.emit('register', data);
  }
}
