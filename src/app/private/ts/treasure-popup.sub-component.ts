import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'treasure-popup',
  templateUrl: '../html/treasure-popup.sub-component.html',
  styleUrls: ['../css/treasure-popup.sub-component.css']
})

export class TreasurePopup {
  
  public amount:any;
  public deposit:any;
  public computation:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.amount = '';
    
    setTimeout(() => {
      this.deposit = 'deposit';
    }, 0);
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
