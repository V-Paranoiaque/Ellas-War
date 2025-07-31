import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { SocketComponent as Socket } from '../../services/socketio.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { UserComponent as User } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alliance-gift-popup',
  templateUrl: './alliance-gift-popup.sub-component.html',
  imports: [CommonModule, FormsModule, TranslateModule],
})
export class AllianceGiftPopupSubComponent implements OnInit, OnDestroy {
  private readonly socket = inject(Socket);
  user = inject(User);
  translate = inject(TranslateService);

  @Input() info!: {
    membre_id: number;
    username: string;
    level: number;
  };

  public giftsError: number;
  public giftRemain: number;
  public qttGiftsRess: string;

  constructor() {
    this.giftsError = 0;
    this.giftRemain = 0;
    this.qttGiftsRess = '';
  }

  ngOnInit() {
    this.socket.on('myAllianceGift', (data: number) => {
      this.giftsError = data;
    });

    this.socket.on('myAllianceGiftRemain', (data: number) => {
      this.giftRemain = data;
    });
  }

  ngOnDestroy() {
    this.socket.removeListener('myAllianceGift');
    this.socket.removeListener('myAllianceGiftRemain');
  }

  memberGifts() {
    this.giftsError = 0;
    const gift = {
      member: this.info.membre_id,
      type: 1,
      qtt: parseInt(this.qttGiftsRess),
    };
    this.socket.emit('myAllianceGift', gift);
    this.qttGiftsRess = '';
  }
}
