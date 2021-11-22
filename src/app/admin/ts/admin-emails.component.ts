import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/admin-emails.component.html',
  styleUrls: ['../css/admin.component.css']
})

export class AdminEmailsComponent implements OnInit, OnDestroy {
  
  public adminemailsPage:number;
  public adminemailsMax:number;
  public adminemailsList:any;
  
  constructor(private socket: Socket, public user: User,
              public translate: TranslateService) {
    this.adminemailsPage = 1;
    this.adminemailsMax = 1;
    this.adminemailsList = [];
  }
  
  ngOnInit() {
    this.user.checkPermissions([1]);
    this.getPage(1);
    
    this.socket.on('adminEmailModification', (res:any) => {
      this.adminemailsPage = res.cPage;
      this.adminemailsMax  = res.max;
      this.adminemailsList = res.list;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('adminEmailModification');
  }
  
  getPage(id:number, inc:number=0) {
    id += inc;
    this.socket.emit('adminEmailModification', id);
  }
  
  pageLoad(event:any) {
    this.getPage(event.target.value);
  }
}
  