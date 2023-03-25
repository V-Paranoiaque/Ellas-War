import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

import treasureChest from '@iconify-icons/mdi/treasure-chest';

@Component({
  selector: 'app-treasure-popup',
  templateUrl: '../html/treasure-popup.sub-component.html'
})

export class TreasurePopupSubComponent implements OnInit, OnDestroy {
  @Input() info: any;
  
  public deposit:string = '';
  public computation:string = '';
  public taxDeduction:number;
  public treasureHistory:any;
  public treasureMax:number;
  
  //Icons
  treasureChest = treasureChest;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.treasureHistory = [];
    this.taxDeduction = 1;
    this.treasureMax = 200000;
  }
  
  ngOnInit() {
    this.socket.on('treasureHistory', (datas) => {
      this.treasureHistory = datas;
    });
    
    if(this.user.getLevel() < 5) {
      this.treasureMax = (this.user.getLevel()+1)*200000;
    }
    else if(this.user.getLevel() == 5) {
      this.treasureMax = 2000000;
    }
    
    if(this.user.getPropertyNb('hermes') == 1) {
      this.taxDeduction = 0.8;
      this.treasureMax *= 1.5;
    }
    
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
