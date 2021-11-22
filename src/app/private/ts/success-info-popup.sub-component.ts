import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-success-info-popup',
  templateUrl: '../html/success-info-popup.sub-component.html'
})

export class SuccessInfoPopupSubComponent implements OnInit, OnDestroy {
  @Input() successType: any;
  
  public statsPlayer:any;
  public hfNext:any;
  public hfDisplay:any;
  public listDisplay:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.hfNext = [];
    this.hfDisplay = [];
    
    this.listDisplay = [];
    this.statsPlayer = {};
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('hfNext');
      this.socket.emit('statsPlayer');
    }, 0);
    
    this.socket.on('statsPlayer', (stats:any) => {
      this.statsPlayer = stats;
    });
    
    this.socket.on("hfNext", (list:any) => {
      this.hfNext = list;
      this.socket.emit('hfDisplay');
    });
    
    this.socket.on("hfDisplay", (data:any) =>{
      this.hfDisplay = data;
      this.calculate();
    });
    
    this.socket.on('successRefresh', () => {
      this.socket.emit('hfNext');
      this.socket.emit('statsPlayer');
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('statsPlayer');
    this.socket.removeListener('hfNext');
    this.socket.removeListener('hfDisplay');
    this.socket.removeListener('successRefresh');
  }
  
  calculate() {
    let nbFS:number = 0;
    this.listDisplay = [];
    
    let hfNextLength = this.hfNext.length;
    for(let i=0;i<hfNextLength;i++) {
      if(this.hfNext[i] && this.hfNext[i].id) {
        this.listDisplay[this.hfNext[i].id] = 1;
      }
    }
    
    let hfDisplayLength = this.hfDisplay.length;
    for(let i=0;i<hfDisplayLength;i++) {
      if(!this.hfDisplay[i] || !this.hfDisplay[i].id) {
        continue;
      }
      
      //Not all or selected
      if(this.successType.selected != 0 && this.successType.selected != this.hfDisplay[i].type) {
        continue;
      }
      
      this.listDisplay[this.hfDisplay[i].id] = 2;
      
      if(this.successType.selected == 7) {
        nbFS++;
      }
    }
    this.calculateNext(nbFS);
  }
  
  calculateNext(nbFS:number) {
    let hfNextLength = this.hfNext.length;
    for(let i=0;i<hfNextLength;i++) {
      if(this.hfNext[i] && this.hfNext[i].id) {
        if(this.successType.selected == 0 || this.successType.selected == this.hfNext[i].type) {
          if(this.listDisplay[this.hfNext[i].id] != 1) {
            this.listDisplay[this.hfNext[i].id] = 0;
          }
        }
        else {
          this.listDisplay[this.hfNext[i].id] = 0;
        }
      }
    }
    
    if(this.successType.selected == 7) {
      this.listDisplay[0] = nbFS;
    }
  }
}
