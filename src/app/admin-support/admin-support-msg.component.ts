import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule } from '@ngx-translate/core';
import { UserComponent as User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLeftMenuSubComponent } from '../admin/admin-left-menu.sub-component';
import { IcIconComponent } from 'src/services/ic-icon.service';
import { MainPrivateBottomMenuSubComponent } from '../main-private/main-private-bottom-menu.sub-component';

import angellistIcon from '@iconify-icons/fa6-brands/angellist';

@Component({
  templateUrl: './admin-support-msg.component.html',
  styleUrls: ['../admin/admin.component.css'],
  imports: [
    AdminLeftMenuSubComponent,
    CommonModule,
    FormsModule,
    IcIconComponent,
    MainPrivateBottomMenuSubComponent,
    RouterModule,
    TranslateModule,
  ],
})
export class AdminSupportMsgComponent implements OnInit, OnDestroy {
  public adminSupportInfo: {
    title: string;
    status: number;
    msg: {
      support_msg: string;
      support_membre: number;
      username: string;
      support_date: number;
    }[];
  } = {
    title: '',
    status: 0,
    msg: [],
  };
  public answertext: string;
  private msg: number;

  angellistIcon = angellistIcon;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private socket: Socket,
    public user: User
  ) {
    this.msg = 0;
    this.answertext = '';
  }

  ngOnInit() {
    this.user.checkPermissions([1]);

    this.route.paramMap.subscribe(params => {
      const msg = params.get('msg');

      if (msg) {
        this.msg = parseInt(msg);
      } else {
        this.msg = 0;
      }

      this.socket.emit('adminSupportInfo', this.msg);
    });

    this.socket.on('adminSupportInfo', data => {
      this.adminSupportInfo = data as typeof this.adminSupportInfo;
    });

    this.socket.on('contactListRefresh', () => {
      this.socket.emit('adminSupportInfo', this.msg);
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('adminSupportInfo');
    this.socket.removeListener('contactListRefresh');
  }

  adminMsgAnswer() {
    if (this.answertext && this.answertext.length > 0) {
      const msg = {
        id: this.msg,
        text: this.answertext.trim(),
      };
      this.socket.emit('adminSupportAnswer', msg);
      this.answertext = '';
    }
  }

  adminSupportStatus() {
    this.socket.emit('adminSupportStatus', this.msg);
  }
}
