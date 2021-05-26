import { Component, OnInit } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { User } from '../../../services/user.service';

import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  templateUrl: '../html/register.component.html'
})

export class Register implements OnInit {
  
  registerForm: FormGroup;
  public rerror: number;
  
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;
  
  constructor(private socket: Socket, public user: User,
              private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({});
    this.rerror = 0;
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
    
    this.socket.on('register', (data:any) => {
      this.rerror = data.error;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('register');
  }
  
  onSubmit(data:object) {
    this.socket.emit('register', data);
  }
  
  oauthFB() {
    let clientId = environment.facebook.client_id;
    let redirectURI = this.user.config.url+'/auth/facebook/';
    
    window.location.href = 'https://www.facebook.com/v10.0/dialog/oauth'+
                           '?client_id='+clientId +
                           '&redirect_uri='+ redirectURI +
                           '&scope=email&response_type=token';
  }
}
