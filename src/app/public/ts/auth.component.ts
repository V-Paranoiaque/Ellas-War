import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { environment } from './../../../environments/environment';

import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';

@Component({
  templateUrl: '../html/auth.component.html'
})

export class Auth {
  public confirmResult:number;
  public provider:string;
  
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;
  
  constructor(private socket: Socket, public user: User, private route: ActivatedRoute) {
    this.confirmResult = 0;
    this.provider = '';
  }
  
  ngOnInit() {
    this.user.checkPermissions([0]);
    
    let provider:any = this.route.snapshot.paramMap.get('provider');
    
    switch(provider) {
      case 'facebook':
        this.provider = provider;
        let fragment:any = this.route.snapshot.fragment;
        let token = fragment.replace('=', '&').split("&")[1];
        this.socket.emit('mobileFB', {
          'token': token,
          'mobile': environment.mobile
        });
      break;
    }
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
