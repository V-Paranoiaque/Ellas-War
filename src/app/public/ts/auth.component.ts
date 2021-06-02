import { ActivatedRoute } from '@angular/router'
import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';
import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/auth.component.html'
})

export class Auth {
  public confirmResult:number;
  public provider:string;
  
  facebookIcon = facebookIcon;
  googleIcon = googleIcon;
  
  constructor(private socket: Socket, private route: ActivatedRoute,
              public user: User) {
    this.confirmResult = 0;
    this.provider = '';
  }
  
  ngOnInit() {
    this.user.checkPermissions([0]);
    
    let provider:any = this.route.snapshot.paramMap.get('provider');
    
    switch(provider) {
      case 'facebook':
        this.provider = provider;
        {
          let fragment:any = this.route.snapshot.fragment;
          let token = fragment.replace('=', '&').split("&")[1];
          this.socket.emit('mobileFB', {
            'token': token,
            'mobile': environment.mobile
          });
        }
      break;
      
      case 'google':
        this.provider = provider;
        {
          let fragment:any = this.route.snapshot.fragment;
          let token = this.user.paramToObject(fragment).id_token;
          
          this.socket.emit('mobileGoogle', {
            'token': token,
            'mobile': environment.mobile
          });
        }
      break;
    }
  }
}
