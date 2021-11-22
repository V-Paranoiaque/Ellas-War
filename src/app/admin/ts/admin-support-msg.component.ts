import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';

import angellistIcon from '@iconify-icons/fa-brands/angellist';

@Component({
  templateUrl: '../html/admin-support-msg.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminSupportMsgComponent implements OnInit, OnDestroy {
  
  public adminSupportInfo:any;
  public answertext:string;
  private msg:number;
  
  angellistIcon = angellistIcon;
  
  constructor(private router: Router, private route: ActivatedRoute,
              private socket: Socket, public user: User) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    let msg = this.route.snapshot.paramMap.get('msg');
    
    if(msg) {
      this.msg = parseInt(msg);
    }
    else {
      this.msg = 0;
    }
    this.answertext = '';
    this.adminSupportInfo = {};
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminSupportInfo', this.msg);
    
    this.socket.on('adminSupportInfo', (data:any) => {
      this.adminSupportInfo = data;
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
    if(this.answertext && this.answertext.length > 0) {
      var msg = {
        'id': this.msg,
        'text': this.answertext.trim()
      };
      this.socket.emit("adminSupportAnswer", msg);
      this.answertext = '';
    }
  }
  
  adminSupportStatus() {
    this.socket.emit('adminSupportStatus', this.msg);
  }
}
