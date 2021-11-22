import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import angellistIcon from '@iconify-icons/fa-brands/angellist';

@Component({
  templateUrl: '../html/admin-contact.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminContactComponent implements OnInit, OnDestroy {
  
  public adminContactList:any;
  public adminContactMax:number;
  public adminContactPage:number;
  
  Tools = Tools;
  
  angellistIcon = angellistIcon;
  
  constructor(private router: Router, private route: ActivatedRoute,
              public user: User, public translate: TranslateService,
              private socket: Socket) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    let id = this.route.snapshot.paramMap.get('id');
    
    if(id) {
      this.adminContactPage = parseInt(id);
    }
    else {
      this.adminContactPage = 1;
    }
    
    this.adminContactList = [];
    this.adminContactMax = 1;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    this.socket.emit('adminContactList', this.adminContactPage);
    
    this.socket.on('adminContactList', (msg:any) => {
      this.adminContactList = msg.list;
      this.adminContactPage = msg.cPage;
      this.adminContactMax  = msg.max;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminContactList');
  }
  
  adminContactChange(page:any) {
    if(!page || page < 1) {
      page = 1;
    }
    
    if(page > this.adminContactMax) {
      page = this.adminContactMax;
    }
    
    this.router.navigate(['/admin/contact/'+page])
  }
  
  adminContactResolve(id:number) {
    this.socket.emit('adminContactResolve', id);
  }
}
