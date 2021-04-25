import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { User } from '../../../services/user.service';

@Component({
  selector: 'success-info-popup',
  templateUrl: '../html/success-info-popup.sub-component.html'
})

export class SuccessInfoPopup {
  @Input() successType: any;
  
  public statsPlayer:any;
  public hfNext:any;
  public hfDisplay:any;
  public listDisplay:any;
  
  constructor(private socket: Socket, public user: User) {
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
  }
  
  ngOnDestroy() {
    this.socket.removeListener('statsPlayer');
    this.socket.removeListener('hfNext');
    this.socket.removeListener('hfDisplay');
  }
  
  calculate() {
    let nbFS = 0;
    this.listDisplay = [];
    
    for(let i=0;i<this.hfNext.length;i++) {
      if(this.hfNext[i] && this.hfNext[i].id) {
        this.listDisplay[this.hfNext[i].id] = 1;
      }
    }
    for(let i=0;i<this.hfDisplay.length;i++) {
      if(this.hfDisplay[i] && this.hfDisplay[i].id) {
        if(this.successType.selected == 0 || 
           this.successType.selected == this.hfDisplay[i].type) {
          if(this.listDisplay[this.hfDisplay[i].id] != 1) {
            this.listDisplay[this.hfDisplay[i].id] = 2;
            if(this.successType.selected == 7) {
              nbFS++;
            }
          }
        }
        else {
          this.listDisplay[this.hfDisplay[i].id] = 0;
        }
      }
    }
    for(let i=0;i<this.hfNext.length;i++) {
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
