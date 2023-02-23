import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { ToolsComponent as Tools } from '../../../services/tools.service';
import { UserComponent as User } from '../../../services/user.service';

import eye from '@iconify/icons-fa-solid/eye';

@Component({
  templateUrl: '../html/support.component.html',
  styleUrls: ['../css/support.component.css']
})

export class SupportComponent implements OnInit, OnDestroy {
  public msg: any;
  public answerMsg:string;
  public contactList:any;
  public contactC:any;
  public contactInfo:any;
  public contactNb:number;
  public contactNewTitle:string;
  public contactNewMsg:string;
  
  parseInt = parseInt;
  Tools = Tools;
  
  eye = eye;
  
  constructor(private router: Router, public user: User, private route: ActivatedRoute, private socket: Socket) {
    this.answerMsg = '';
    this.contactList = [];
    this.contactNb = 0;
    this.contactInfo = {
      'msg': []
    }
    
    //New msg
    this.contactNewTitle = '';
    this.contactNewMsg = '';
    
  }
  
  ngOnInit() {
    this.user.checkPermissions([1,2,3,4,5]);
    
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id) {
        this.contactC = id;
      }
      else {
        this.contactC = 1;
      }
      
      let msg = params.get('msg');
      if(msg) {
        this.msg = msg;
      }
      else {
        this.msg = 0;
      }

      this.socket.emit('contactList', this.contactC);
      this.loadSupport();
    });  
    
    this.socket.on('contactList', (data) => {
      this.contactList = data.list;
      this.contactNb   = data.max;
      this.contactC    = data.cPage;
    });
    
    this.socket.on('contactListRefresh', () => {
      this.socket.emit('contactList');
      this.loadSupport();
    });
    
    this.socket.on('contactNew', (data:number) => {
      this.router.navigate(['/support/1/'+data])
    });
    
    this.socket.on('contactInfo', (data) => {
      this.contactInfo = data as typeof this.contactInfo;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('contactList');
    this.socket.removeListener('contactListRefresh');
    this.socket.removeListener('contactNew');
    this.socket.removeListener('contactInfo');
  }
  
  contactAnswer() {
    if(this.answerMsg.trim().length > 0) {
      let info = ({
        'id': this.msg,
        'text': this.answerMsg.trim()
      });
      this.socket.emit('contactAnswer', info);
      this.answerMsg = '';
    }
  }
  
  contactNewSend() {
    let title = this.contactNewTitle.trim();
    let text  = this.contactNewMsg.trim();
    
    if(title.length > 0 && text.length > 0) {
      let info = ({
        'title': title,
        'text': text
      });
      this.socket.emit('contactNew', info);
      
      let element:HTMLElement = document.getElementById('SupportNewTopicClose') as HTMLElement;
      element.click();
      
      this.contactNewTitle = '';
      this.contactNewMsg = '';
    }
  }
  
  loadSupport() {
    if(this.msg > 0) {
      this.socket.emit('contactInfo', this.msg);
    }
  }
  
  supportPageChange(page:any) {
    if(!page || page < 1) {
      page = 1;
    }
    
    if(page > this.contactNb) {
      page = this.contactNb;
    }
    
    this.router.navigate(['/support/'+page])
  }
}
