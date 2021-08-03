import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import eyeIcon from '@iconify/icons-fa-solid/eye';

@Component({
  templateUrl: '../html/admin-support.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminSupport {
  public adminSupportList:any;
  public adminSupportMax:number;
  public adminSupportPage:number;
  
  eyeIcon = eyeIcon;
  
  constructor(private router: Router, private route: ActivatedRoute,
              private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    let id = this.route.snapshot.paramMap.get('id');
    
    if(id) {
      this.adminSupportPage = parseInt(id);
    }
    else {
      this.adminSupportPage = 1;
    }
    this.adminSupportList = [];
    this.adminSupportMax = 1;
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    
    this.socket.emit('adminSupportList', this.adminSupportPage);
    
    this.socket.on('adminSupportList', (msg:any) => {
      this.adminSupportList = msg.list;
      this.adminSupportPage = msg.cPage;
      this.adminSupportMax  = msg.max;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminSupportList');
  }
  
  adminSupportPageChange(page:any) {
    if(!page || page < 1) {
      page = 1;
    }
    
    if(page > this.adminSupportMax) {
      page = this.adminSupportMax;
    }
    
    this.router.navigate(['/admin/support/'+page])
  }
  
  range(a:number, b:number) {
    let list = []
    for(a;a<=b;a++) {
      list.push(a);
    }
    return list;
  }
}
