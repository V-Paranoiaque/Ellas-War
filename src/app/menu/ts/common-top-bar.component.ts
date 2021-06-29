import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';
import { Router } from '@angular/router'
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from './../../../environments/environment';

import greekcolumnIcon from '@iconify/icons-whh/greekcolumn';
import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  selector: 'common-top-bar',
  templateUrl: '../html/common-top-bar.component.html'
})

export class CommonTopBar implements OnInit {
  @ViewChild('serverModal', { static: false }) serverModal!: ModalDirective;
  displayServerModal = false;
  
  @Input()
  active: string;
  
  greekcolumnIcon = greekcolumnIcon;
  questionCircle  = questionCircle;
  
  constructor(protected http: HttpClient, protected socket: Socket, 
              protected router: Router, public user: User,
              protected modalService: BsModalService) {
    this.active = '';
  }
  
  ngOnInit() {
    this.getApi();
    
    this.socket.on('user', (data: any) => {
      if(data) {
        this.user.setUser(data)
      }
    });
    this.socket.on('ress', (data: any) => {
      if(data) {
        this.user.setUserRess(data)
      }
    });
    this.socket.on('redirect', () => {
      this.router.navigate(['/'])
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('user');
    this.socket.removeListener('ress');
    this.socket.removeListener('redirect');
  }
  
  disconnect() {
    this.user.disconnect();
  }
  
  getApi() {
    let url = this.socket.url+'/api.json';
    this.http.get(url).subscribe((result:any) => {
      try {
        if(result && !result.min) {
          this.displayServerModal = true;
        }
      } catch (e) {
        this.displayServerModal = true;
      }
    });
  }
  
  refresh() {
    if(environment.mobile == 1 || this.socket.local) {
      this.user.reload();
    }
    else {
      //Redirect to the selected server
      this.socket.redirect(this.socket.url);
    }
  }
  
  onHidden(): void {
    this.displayServerModal = false;
  }
}
