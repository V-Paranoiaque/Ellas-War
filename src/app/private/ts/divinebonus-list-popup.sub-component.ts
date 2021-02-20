import { Component } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

@Component({
  selector: 'divinebonus-list-popup',
  templateUrl: '../html/divinebonus-info-list.sub-component.html'
})

export class DivineBonusListPopup {
  
  public divineBonus:any;
  
  constructor(private socket: Socket) {
    this.divineBonus = [];
  
    this.socket.socket.on('divineBonus', (data:any) => {
      if(data.nb > 0) {
        this.divineBonus   = data.list;
      }
      else {
        this.divineBonus = [];
      }
    });
  }
  
  divineBonusUse(bonus_id:number) {
    let msg = {
      'bonus_id': bonus_id
    };
    this.socket.emit("divineBonusUse", msg);
  }
}
