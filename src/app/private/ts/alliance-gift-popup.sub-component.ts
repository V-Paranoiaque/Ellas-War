import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SocketComponent as Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { UserComponent as User } from '../../../services/user.service';

@Component({
  selector: 'app-alliance-gift-popup',
  templateUrl: '../html/alliance-gift-popup.sub-component.html'
})

export class AllianceGiftPopupSubComponent implements OnInit, OnDestroy {
  
  @Input() info:any;
  
  public giftsError:number;
  public giftRemain:number;
  public qttGiftsRess:any;
  
  constructor(private socket: Socket, public user: User, public translate: TranslateService) {
    this.giftsError = 0;
    this.giftRemain = 0;
    this.qttGiftsRess = '';
  }
  
  ngOnInit() {
    this.socket.on('myAllianceGift', (data:number) => {
      this.giftsError = data;
    });
    
    this.socket.on('myAllianceGiftRemain', (data:number) => {
      this.giftRemain = data;
    });
  }
  
  ngOnDestroy() {
    this.socket.removeListener('myAllianceGift');
    this.socket.removeListener('myAllianceGiftRemain');
  }
  
  memberGifts() {
    this.giftsError = 0;
    let gift = {
      member: this.info.membre_id,
      type: 1,
      qtt: this.qttGiftsRess
    };
    this.socket.emit('myAllianceGift', gift);
    this.qttGiftsRess = '';
  }
}
