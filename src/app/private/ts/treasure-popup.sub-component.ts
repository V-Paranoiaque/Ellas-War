import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  selector: 'treasure-popup',
  templateUrl: '../html/treasure-popup.sub-component.html',
  styleUrls: ['../css/treasure-popup.sub-component.css']
})

export class TreasurePopup {
  
  public amount:any;
  public deposit:any;
  public computation:any;
  public treasureHistory:any;
  public treasureMode:number;
  
  //Icons
  treasureChest = treasureChest;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.amount = '';
    this.treasureHistory = [];
    this.treasureMode = 0;
    
    this.socket.on('treasureHistory', (datas:any) => {
      this.treasureHistory = datas;
    });
    
    setTimeout(() => {
      this.deposit = 'deposit';
      this.computation = '2';
      
      this.socket.emit('treasureHistory');
    }, 0);
  }
  
  ngOnDestroy() {
    this.socket.removeListener('treasureHistory');
  }
  
  setTreasureMode(mode:number) {
    this.treasureMode = mode;
  }
  
  treasureAction() {
    if(this.amount && this.amount > 0) {
      if(this.deposit == 'deposit') {
         this.socket.emit('treasureAdd', this.amount);
      }
      else {
        let msg = {
          'amount': this.amount,
          'computation': this.computation
        };
        this.socket.emit('treasureRemove', msg);
      }
      this.amount = '';
    }
  }
}
