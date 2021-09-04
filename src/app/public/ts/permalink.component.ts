import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  templateUrl: '../html/permalink.component.html'
})

export class PermalinkComponent implements OnInit, OnDestroy {
  
  private currentMsg: any;
  
  constructor(private titleService: Title, public translate: TranslateService,
              private socket: Socket, public user: User,
              private route: ActivatedRoute) {
  }
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.socket.emit('msgInfo', id);
    
    this.socket.on('msgInfo', (msgInfo:any) => {
      this.currentMsg = msgInfo;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('msgInfo');
  }
  
  getCurrentMsg() {
    return this.currentMsg;
  }
}
