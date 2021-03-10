import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'temple-info-popup',
  templateUrl: '../html/temple-info-popup.sub-component.html',
  styleUrls: ['../css/temple-info-popup.sub-component.css']
})

export class TempleInfoPopup {
  @Input() temple: any;
  
  public wallDefense:number;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.wallDefense = 0;
    
    setTimeout(() => {
      this.socket.emit('wallDefense');
    }, 0);
    
    
    this.socket.socket.on('wallDefense', (def:number) => {
      this.wallDefense = def;
    });
  }
  
  powerUse(powerid:number, param:number) {
    let info = {
      'id': powerid,
      'param': param
    }
    this.socket.emit('powersUse', info);
  }
  
  wallErect() {
    this.socket.emit('wallErect');
  }
}
