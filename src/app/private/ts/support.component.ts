import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

import eye from '@iconify/icons-fa-solid/eye';

@Component({
  templateUrl: '../html/support.component.html',
  styleUrls: ['../css/support.component.css']
})

export class Support {
  public id: any;
  public answerMsg:string;
  public contactList:any;
  public contactC:number;
  public contactInfo:any;
  public contactNb:number;
  public contactNewTitle:string;
  public contactNewMsg:string;
  
  eye = eye;
  
  constructor(private router: Router, private route: ActivatedRoute, private socket: Socket) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    let id = this.route.snapshot.paramMap.get('id');
    
    if(id) {
      this.id = id;
    }
    else {
      this.id = 0;
    }
    
    this.answerMsg = '';
    this.contactList = [];
    this.contactNb = 0;
    this.contactC  = 1;
    this.contactInfo = {
      'msg': []
    }
    
    //New msg
    this.contactNewTitle = '';
    this.contactNewMsg = '';
    
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('contactList');
      this.loadSupport();
    }, 0);
    
    this.socket.on('contactList', (data:any) => {
      this.contactList = data.list;
      this.contactNb   = data.max;
      this.contactC    = data.cPage;
    });
    
    this.socket.on('contactListRefresh', () => {
      this.socket.emit('contactList');
      this.loadSupport();
    });
    
    this.socket.on('contactNew', (data:number) => {
      this.router.navigate(['/support', data])
    });
    
    this.socket.on('contactInfo', (data:any) => {
      this.contactInfo = data;
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
        'id': this.id,
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
    if(this.id > 0) {
      this.socket.emit('contactInfo', this.id);
    }
  }
}
