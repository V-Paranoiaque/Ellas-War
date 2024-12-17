import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { ToolsComponent as Tools } from '../../services/tools.service';
import { UserComponent as User } from '../../services/user.service';
import googleIcon from '@iconify-icons/logos/google-icon';
import { environment } from './../../environments/environment';
import { TranslateModule } from '@ngx-translate/core';

import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainLeftSubComponent } from '../main/main-left.sub-component';
import { MainRightSubComponent } from '../main/main-right.sub-component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [
    IcIconComponent,
    MainLeftSubComponent,
    MainRightSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AuthComponent implements OnInit {
  public confirmResult: number;
  public provider: string;

  googleIcon = googleIcon;

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    public user: User
  ) {
    this.confirmResult = 0;
    this.provider = '';
  }

  ngOnInit() {
    this.user.checkPermissions([0]);

    const provider = this.route.snapshot.paramMap.get('provider');

    switch (provider) {
      case 'facebook':
        this.provider = provider;
        {
          const fragment = this.route.snapshot.fragment ?? '';
          const token = fragment.replace('=', '&').split('&')[1];
          this.socket.emit('mobileFB', {
            token: token,
            mobile: environment.mobile,
          });
        }
        break;

      case 'google':
        this.provider = provider;
        {
          const fragment = this.route.snapshot.fragment ?? '';
          const fragmentTab = Tools.paramToObject(fragment);

          const token = fragmentTab.get('id_token');
          const state = fragmentTab.get('state');

          this.socket.emit('mobileGoogle', {
            token: token,
            state: state,
            mobile: environment.mobile,
            extra: this.user.getExtra(),
          });
        }
        break;
    }
  }
}
