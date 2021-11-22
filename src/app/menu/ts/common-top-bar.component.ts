import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { UserComponent as User } from '../../../services/user.service';
import { Router } from '@angular/router'
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { environment } from './../../../environments/environment';

import greekcolumnIcon from '@iconify/icons-whh/greekcolumn';
import questionCircle from '@iconify/icons-fa-regular/question-circle';

@Component({
  selector: 'app-common-top-bar',
  templateUrl: '../html/common-top-bar.component.html'
})

export class CommonTopBarComponent implements OnInit, OnDestroy {
  @ViewChild('serverModal', { static: false }) serverModal!: ModalDirective;
  displayServerModal  = false;
  displayVersionModal = false;
  
  @Input()
  active: string;
  
  public localVersion:number;
  public remoteVersion:number;
  private sub:any;
  
  greekcolumnIcon = greekcolumnIcon;
  questionCircle  = questionCircle;
  
  constructor(protected http: HttpClient, protected socket: Socket, 
              protected router: Router, public user: User,
              protected modalService: BsModalService) {
    this.active = '';
    this.localVersion  = environment.version;
    this.remoteVersion = 0;
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
    
    if(this.sub) {
      this.sub.unsubscribe();
    }
    
    let elements = document.getElementsByClassName("modal");
    while(elements.length > 0){
      if(elements[0]) {
        if(elements[0].parentNode) {
          elements[0].parentNode.removeChild(elements[0]);
        }
      }
    }
  }
  
  disconnect() {
    this.user.disconnect();
  }
  
  getApi() {
    let url = this.socket.url+'/api.json';
    this.sub = this.http.get(url).subscribe({
      next: (result:any) => {
        try {
          if(result && !result.min) {
            this.displayServerModal = true;
          }
          else {
            this.displayServerModal = false;
            this.remoteVersion = result.min;
            this.checkVersion();
          }
        }
        catch (e) {
          this.displayServerModal = true;
        }
        
        if(this.displayServerModal) {
          setTimeout(() => {
            this.getApi();
          }, 5000);
        }
      },
      error: () => {
        this.displayServerModal = true;
        
        setTimeout(() => {
          this.getApi();
        }, 5000);
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
    this.displayServerModal  = false;
    this.displayVersionModal = false;
  }
  
  checkVersion() {
    if(this.localVersion == 0) {
      this.displayVersionModal = false;
    }
    else if(this.localVersion < this.remoteVersion) {
      this.displayVersionModal = true;
    }
    else {
      this.displayVersionModal = false;
    }
  }
}
