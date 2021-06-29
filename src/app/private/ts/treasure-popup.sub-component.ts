import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  selector: 'treasure-popup',
  templateUrl: '../html/treasure-popup.sub-component.html'
})

export class TreasurePopup {
  @Input() info: any;
  
  public deposit:any;
  public computation:any;
  public treasureHistory:any;
  
  //Icons
  treasureChest = treasureChest;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.treasureHistory = [];
    
  }
  
  ngOnInit() {
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
  
  setTreasure(amount:number) {
    if(this.deposit == 'deposit') {
      this.info.amount = amount;
    }
    else {
      this.info.amount = this.user.getPropertyNb('treasure');
    }
  }
  
  setTreasureMode(mode:number) {
    this.info.treasureMode = mode;
  }
  
  treasureAction() {
    if(this.info.amount && this.info.amount > 0) {
      if(this.deposit == 'deposit') {
         this.socket.emit('treasureAdd', this.info.amount);
      }
      else {
        let msg = {
          'amount': this.info.amount,
          'computation': this.computation
        };
        this.socket.emit('treasureRemove', msg);
      }
      this.info.amount = '';
    }
  }
}
