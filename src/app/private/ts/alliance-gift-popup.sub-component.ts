import { Component, Input } from '@angular/core';
import { Socket } from '../../../services/socketio.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../services/user.service';

@Component({
  selector: 'alliance-gift-popup',
  templateUrl: '../html/alliance-gift-popup.sub-component.html'
})

export class AllianceGiftPopup {
  
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
