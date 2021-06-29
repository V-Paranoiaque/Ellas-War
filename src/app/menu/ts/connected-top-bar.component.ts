import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'

import { CommonTopBar } from './common-top-bar.component';
import { BsModalService } from 'ngx-bootstrap/modal';

import cog from '@iconify/icons-fa-solid/cog';
import powerOff from '@iconify/icons-fa-solid/power-off';

@Component({
  selector: 'connected-top-bar',
  templateUrl: '../html/connected-top-bar.component.html',
  styleUrls: ['../css/connected-top-bar.component.css']
})

export class ConnectedTopBar extends CommonTopBar {
  
  @Input()
  
  private favicon: HTMLLinkElement = document.querySelector('#favicon') as HTMLLinkElement;
  private audio:any;
  
  cog      = cog;
  powerOff = powerOff;
  
  constructor(protected http: HttpClient, socket: Socket, 
              router: Router, public user: User,
              protected modalService: BsModalService) {
    super(http, socket, router, user, modalService);
    
    this.audio = new Audio();
    this.audio.src = "./assets/audio/2042.mp3";
    this.audio.load();
  }
  
  ngOnInit() {
    if(this.active == 'home' || this.active == 'login') {
      this.router.navigate(['/city'])
    }
    
    setTimeout(() => {
      this.socket.emit('msgNewNb');
    }, 0);
    
    this.socket.on('msgNewNb', (nb:number) => {
      let play = this.user.setNewMsg(nb)
      
      if(nb > 0) {
        this.favicon.href = 'assets/favicon-notif.png';
        
        if(this.user.getPropertyNb('sound') == 1 && play == 1) {
          this.audio.play();
        }
      }
      else {
        this.favicon.href = 'assets/favicon-normal.png';
      }
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('msgNewNb');
  }
}
