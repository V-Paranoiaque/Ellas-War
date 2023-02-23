import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EwIconSubComponent } from '../../../services/ew-icon.service';
import { SocketComponent as Socket } from '../../../services/socketio.service';

@Component({
  selector: 'app-divinebonus-list-popup',
  templateUrl: '../html/divinebonus-info-list.sub-component.html',
  styleUrls: ['../css/divinebonus-info-list.sub-component.css']
})

export class DivineBonusListPopupSubComponent implements OnInit, OnDestroy {
  @Input() divineBonus: any;
  
  public divineBonusList:any;
  
  EwIcon = EwIconSubComponent;
  
  constructor(private socket: Socket) {
    this.divineBonus = [];
  }
  
  ngOnInit() {
    this.socket.on('divineBonus', (data) => {
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
    this.socket.emit('divineBonusUse', msg);
    this.divineBonus.error = 1;
  }
}
