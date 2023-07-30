import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { UserComponent as User } from '../../../services/user.service';
import facebookIcon from '@iconify-icons/logos/facebook';
import googleIcon from '@iconify-icons/logos/google-icon';
import { environment } from './../../../environments/environment';

@Component({
  templateUrl: '../html/auth.component.html'
})

export class AuthComponent implements OnInit {
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
    
    let provider = this.route.snapshot.paramMap.get('provider');
    
    switch(provider) {
      case 'facebook':
        this.provider = provider;
        {
          let fragment = this.route.snapshot.fragment || '';
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
          const fragment = this.route.snapshot.fragment || '';
          const fragmentTab = Tools.paramToObject(fragment);
          
          const token = fragmentTab.id_token;
          const state = fragmentTab.state;
          
          this.socket.emit('mobileGoogle', {
            'token': token,
            'state': state,
            'mobile': environment.mobile,
            'extra': this.user.getExtra()
          });
        }
      break;
    }
  }
}
