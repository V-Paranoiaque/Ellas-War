import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';

@Component({
  selector: 'divinebonus-list-popup',
  templateUrl: '../html/divinebonus-info-list.sub-component.html',
  styleUrls: ['../css/divinebonus-info-list.sub-component.css']
})

export class DivineBonusListPopup {
  @Input() divineBonus: any;
  
  public divineBonusList:any;
  
  constructor(private socket: Socket) {
    this.divineBonus = [];
  }
  
  ngOnInit() {
    this.socket.on('divineBonus', (data:any) => {
      if(data.nb > 0) {
        this.divineBonusList   = data.list;
      }
      else {
        this.divineBonusList = [];
      }
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('divineBonus');
  }
  
  divineBonusUse(bonus_id:number) {
    let msg = {
      'bonus_id': bonus_id
    };
    //this.socket.emit("divineBonusUse", msg);
    this.divineBonus.error = 1;
  }
}
