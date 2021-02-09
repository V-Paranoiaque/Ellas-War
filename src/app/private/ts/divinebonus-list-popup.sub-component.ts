import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

@Component({
  selector: 'divinebonus-list-popup',
  templateUrl: '../html/divinebonus-info-list.sub-component.html'
})

export class DivineBonusListPopup {
  
  constructor(private socket: Socket) {
  
  }
  
  divineBonusUse(bonus_id:number) {
    let msg = {
      'bonus_id': bonus_id
    };
    this.socket.emit("divineBonusUse", msg);
  }
}
