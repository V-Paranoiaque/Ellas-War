import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

@Component({
  selector: 'success-info-popup',
  templateUrl: '../html/success-info-popup.sub-component.html'
})

export class SuccessInfoPopup {
  @Input() successType: number;
  
  public statsPlayer:any;
  
  constructor(private socket: Socket) {
    this.successType = 0;
    
    this.socket.socket.on('statsPlayer', (data:any) => {
      this.statsPlayer = data;
    });
  }
  
  ngOnInit() {
    setTimeout(() => {
      this.socket.emit('hfNext');
      this.socket.emit('statsPlayer');
    }, 0);
  }
  
  
}
